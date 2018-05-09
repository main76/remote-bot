import { CommandExecutor, TextBaseChannel, Executable, SetupCommands } from "../common/command";
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

@SetupCommands
export class Feature extends CommandExecutor {
    @Executable('update', "Update this bot itself.")
    public Update(channel: TextBaseChannel): string {
        const updatecmd = 'git pull && npm install && tsc';
        exec(updatecmd, {
            cwd: path.join(__dirname, '..')
        }, (err, stdout, stderr) => {
            if (err) {
                channel.send(err.message);
            }
            else if (stdout) {
                channel.send(stdout);
            }
            else if (stderr) {
                channel.send(stderr);
            }
            channel.send('Asynchronous command finished.');
        });
        return `Runing update("${updatecmd}") asynchronously.`;
    }

    @Executable('reboot', "Reboot this bot.")
    public Reboot(channel: TextBaseChannel): string {
        channel.send('Bot will shut down in 5s.');
        setTimeout(() => {
            process.exit(1);
        }, 5000);
        return;
    }
}

@SetupCommands
export class Terminal extends CommandExecutor {
    private _cwd: string;

    constructor() {
        super();
        this._cwd = process.cwd();
    }

    @Executable('cd', "Change working directory.")
    public ChangeDirectory(channel: TextBaseChannel, cmd: string[]): string {
        const [dir,] = cmd;
        process.chdir(dir);
        this._cwd = process.cwd();
        return `Current working directory: "${this._cwd }".`;
    }

    @Executable('file', "Export file.")
    public ExportFile(channel: TextBaseChannel, cmd: string[]): string {
        let [fn,] = cmd;
        const bn = path.basename(fn);
        fn = path.join(this._cwd, fn);
        channel.send(fn, { file: { attachment: fn, name: bn } });
        return `Uploading file "${fn}" asynchronously.`;
    }

    @Executable('run', "Run commands.")
    public RunCmd(channel: TextBaseChannel, cmd: string[]): string {
        const _cmd = cmd.join(' ');
        exec(_cmd, {
            cwd: this._cwd
        }, (err, stdout, stderr) => {
            const timestamp = Date.now();
            if (err) {
                channel.send(err.message);
            }
            if (stdout) {
                TrySendContent(channel, stdout, timestamp, 'stdout');
            }
            if (stderr) {
                TrySendContent(channel, stderr, timestamp, 'stderr');
            }
            channel.send('Asynchronous command finished.');
        });
        return `Runing "${_cmd}" asynchronously.`;
    }
}

let log_root = path.join(__dirname, '..', 'job_logs');
if (fs.existsSync(log_root)) {
    fs.mkdirSync(log_root);
}
const DISCORD_BODY_LIMIT = 2000;

function TrySendContent(channel: TextBaseChannel, content: string, timestamp: number, suffix: string) {
    if (content.length > DISCORD_BODY_LIMIT) {
        const bn = `${timestamp}.${suffix}`;
        const log = path.join(log_root, bn);
        fs.writeFile(log, content, (err) => {
            if (err) {
                channel.send(err.message);
                return;
            }
            channel.send(`Content of ${suffix} is too large, attach as file.`, { 
                file: { attachment: log, name: bn } 
            });
        });
    } else {
        channel.send(content);
    }
}
