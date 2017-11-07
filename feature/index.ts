import { CommandExecutor } from "../common/command";
import { exec } from 'child_process'

export class Feature extends CommandExecutor {

    constructor() {
        super();
        this._commands.set('update', this.Update.bind(this));
        this._commands.set('reboot', this.Reboot.bind(this));
    }

    public async Update(): Promise<string> {
        let response = '';
        await exec('git pull && tsc', (err, stdout, stderr) => {
            if (err) {
                response += err.message;
            }
            else if (stdout) {
                response += stdout;
            }
            else if (stderr) {
                response += stderr;
            }
        });
        return response;
    }

    public Reboot(): string {
        setTimeout(() => {
            process.exit(1);            
        }, 5000);
        return 'Rebooting in 5s';
    }

}
