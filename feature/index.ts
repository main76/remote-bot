import { CommandExecutor } from "../common/command";

export class Feature extends CommandExecutor {

    constructor() {
        super();
        this._commands.set('update', () => 'git pull && tsc');
        this._commands.set('reboot', () => 'process.exit(1)');
    }

}
