import { Message } from 'discord.js'

export type Command = {
    (cmd: string[]): string,
    IsBackDoor?: boolean
}


export abstract class CommandExecutor {
    protected _commands: Map<string, Command>;
    constructor() {
        this._commands = new Map();
    }
    public Execute(cmd: string[]): string {
        try {
            let [cmdName, ...restArgs] = cmd;
            let command = this._commands.get(cmdName);
            if (!command) {
                return `unexpected command ${cmdName}`;
            }
            return command(restArgs);
            
        } catch (error) {
            return (<Error>error).message;
        }
    }
    public get Commands(): IterableIterator<string> {
        return this._commands.keys();
    }
}

export interface IHandler {
    Instance: CommandExecutor;
    Prefix: string;
    Validate(msg: Message): boolean;
}

