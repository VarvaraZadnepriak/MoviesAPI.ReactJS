const fs = require('fs');
const path = require('path');
const { toJSON } = require('../app');

const TransformStream = require('stream').Transform;

module.exports = class JSONStream extends TransformStream {
    constructor(filename, relatedDir) {
        super({ objectMode: true });

        this.filename = null;
        this.onRead = false;
        if (filename) {
            this.setFilename(filename, relatedDir);
        }
    }

    setFilename(filename, relatedDir) {
        const fnParsed = path.parse(path.resolve(relatedDir || process.cwd(), filename));

        if (fnParsed.ext === '' || fnParsed.ext === '.') {
            this.filename = path.join(fnParsed.dir, `${fnParsed.base}.jsons`);
        } else {
            this.filename = path.join(fnParsed.dir, filename);
        }
    }

    writeData(data) {
        if (this.onRead) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            if (!this.filename) {
                console.error('Filename is not set');
                resolve();
                return;
            }

            let dataStr = '';
            if (fs.existsSync(this.filename)) {
                dataStr += '\n';
            }
            if (typeof data === 'string') {
                dataStr += data;
            } else {
                dataStr += JSON.stringify(data);
            }

            fs.appendFile(this.filename, dataStr, (err) => {
                resolve();
            });
        });
    }

    readData() {
        if (this.onRead) {
            return Promise.resolve();
        }

        this.onRead = true;

        return new Promise((resolve) => {
            if (!this.filename) {
                console.error('Filename is not set!');
                resolve();
                return;
            }

            if (!fs.existsSync(this.filename)) {
                resolve();
                return;
            }

            try {
                const file = fs.createReadStream(this.filename, { encoding: 'utf8' });
                file.pipe(this);
                this.on('end', () => {
                    resolve();
                });
                this.on('close', () => {
                    resolve();
                });
                this.on('error', (err) => {
                    this.destroy();
                    resolve();
                });
            } catch (err) {
                console.error(err);
                resolve();
            }
        }).then(() => {
            this.onRead = false;
        });
    }

    _transform(data, encoding, callback) {
        if (!Buffer.isBuffer(data)) {
            data = new Buffer.from(data);
        }

        if (this._buffer) {
            data = Buffer.concat([this._buffer, data]);
        }

        let start, ptr;
        ptr = start = 0;

        if (data.length >= 3) {
            if (data[0] == 0xef && data[1] == 0xbb && data[2] == 0xbf) {
                ptr = start = 3;
                // Hm, utf-8 with BOM? Ok, skip BOM
            }
        }

        for (let end = 1; end <= data.length; end++) {
            try {
                const obj = JSON.parse(data.slice(start, end));
                this.push(obj);
                start = end;
            } catch {
                null;
            }
        }
        this._buffer = data.slice(start);
        callback();
    }
};
