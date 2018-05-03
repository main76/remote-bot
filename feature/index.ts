import { CommandExecutor, TextBaseChannel, Executable, SetupCommands } from "../common/command";
import { exec } from 'child_process'
import * as path from 'path'

@SetupCommands
export class Feature extends CommandExecutor {
    @Executable('update', "Update this bot itself.")
    public Update(channel: TextBaseChannel): string {
        const updatecmd = 'git pull && tsc';
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
        fn = path.join(this._cwd, fn);
        channel.send(fn, { file: fn });
        return `Uploading file "${fn}" asynchronously.`;
    }

    @Executable('run', "Run commands.")
    public RunCmd(channel: TextBaseChannel, cmd: string[]): string {
        const _cmd = cmd.join(' ');
        exec(_cmd, {
            cwd: this._cwd
        }, (err, stdout, stderr) => {
            if (err) {
                channel.send(err.message);
            }
            else if (stdout) {
                if (stdout.length > 1e5) {
                    stdout = stdout.substring(0, 1e5);
                }
                channel.send(stdout);
            }
            else if (stderr) {
                channel.send(stderr);
            }
            channel.send('Asynchronous command finished.');
        });
        return `Runing "${_cmd}" asynchronously.`;
    }
}
