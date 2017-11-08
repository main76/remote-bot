import { CommandExecutor, TextBaseChannel } from "../common/command";
import { exec } from 'child_process'
import * as path from 'path'

export class Feature extends CommandExecutor {

    constructor() {
        super();
        this._commands.set('update', this.Update.bind(this));
        this._commands.set('reboot', this.Reboot.bind(this));
    }

    public Update(channel:TextBaseChannel): string {
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
        });
        return `Runing update("${updatecmd}") asynchronously.`;
    }

    public Reboot(channel:TextBaseChannel): string {
        channel.send('Bot will shut down in 5s.');
        setTimeout(() => {
            process.exit(1);
        }, 5000);
        return;
    }

}
