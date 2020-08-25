const killProcessByProt = require('./utils/kill-server');

console.log(`movieAPI: preparing`);

const { app, start } = require('./app');
console.log('movieAPI: server prepared');

const port = process.argv[2] || 4000;

killProcessByProt(port, console.log)
    .then(() => {
        console.log('movieAPI: load transactions');
        return start();
    })
    .then(() => {
        console.log(`movieAPI: ready to start`);
        app.listen(port, () => {
            console.log(`movieAPI: listening on ${port}`);
        });
    })
    .catch((err) => {
        console.log(`movieAPI: can't start: ${err.message}`);
    });
