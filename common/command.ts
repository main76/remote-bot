import { Message, TextChannel, DMChannel, GroupDMChannel } from 'discord.js'

export type TextBaseChannel = TextChannel | DMChannel | GroupDMChannel;

export type Command = {
    (channel?: TextBaseChannel, cmd?: string[]): string,
    IsBackDoor?: boolean
}

export abstract class CommandExecutor {
    protected _commands: Map<string, Command>;
    constructor() {
        this._commands = new Map();
    }
    public Execute(channel: TextBaseChannel, cmd: string[]): void {
        try {
            let [cmdName, ...restArgs] = cmd;
            let command = this._commands.get(cmdName);
            if (!command) {
                channel.send(`unexpected command ${cmdName}`);
                return;
            }
            let info = command(channel, restArgs);
            if (info) {
                channel.send(info);
            }
        } catch (error) {
            channel.send((<Error>error).message);
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

