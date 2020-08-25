const { exec } = require('child_process');

/**
 * Kill all processes that are occupied network port
 *
 * netstat command-line util is used
 *
 * (Windows specific)
 *    netstat -ano
 *
 * (Linux specific)
 *    netstat -apntu
 *
 * Connections with :<port> are searched and killed by its process ID
 *
 * - returns PID or list of PIDs as string of all killed processes
 *      [1234], [12445] (with error), [76123]
 *
 * - returns empty string if no process is killed
 * @param {string | number} port
 * @param {callback} logerr
 * @returns Promise
 */
function killProcessesByPort(port, logerr) {
    return new Promise((resolve) => {
        let netstat;

        // Prepare os-specific netstat
        if (process.platform === 'win32') {
            netstat = {
                cmd: 'netstat -ano',
                idxSrvSocket: 1,
                idxPID: 4
            };
        } else if (process.platform === 'linux') {
            netstat = {
                cmd: 'netstat -apntu',
                idxSrvSocket: 3,
                idxPID: 6
            };
        } else {
            logerr(new Error(`Platform ${process.platform} is not supported`));
            resolve('');
            return;
        }

        exec(netstat.cmd, async (error, stdout) => {
            if (error) {
                logerr(error);
                resolve('');
                return;
            }
            const allProcessIDs = new Set();

            stdout
                .trim()
                .split(/(\r\n|\n|\r)+/g)
                .forEach((line) => {
                    const par = line.trim().split(/\s+/g);
                    if (par[netstat.idxSrvSocket] && par[netstat.idxSrvSocket].endsWith(`:${port}`)) {
                        allProcessIDs.add(par[netstat.idxPID].split('/')[0].trim());
                    }
                });

            let allPIDs = '';
            for (const pid of allProcessIDs) {
                try {
                    await killProcessByID(pid);
                    allPIDs = `[${pid}]${allPIDs ? ', ' : ''}${allPIDs}`;
                    await delay(1000); // pause of 1 second after process kill
                } catch (err) {
                    logerr(`Warning: ${err.message}`);
                    allPIDs += `${allPIDs ? ', ' : ''}[${pid}] (with error)`;
                }
            }

            resolve(allPIDs);
        });
    });
}

module.exports = killProcessesByPort;

/**
 * Kill process by its processID (PID)
 */
function killProcessByID(pid) {
    try {
        const processId = parseInt(pid, 10);
        if (!Number.isNaN(processId) && processId) {
            process.kill(processId);
        }
    } catch (err) {
        throw new Error(`Error while trying to stop process ID [${pid}], reason: ${err.message}`);
    }
}

/**
 * setTimeout as promise
 */
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
