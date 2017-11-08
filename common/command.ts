import { Message, TextChannel, DMChannel, GroupDMChannel } from 'discord.js'

export type TextBaseChannel = TextChannel | DMChannel | GroupDMChannel;

export type CommandUsage = [string, string][]

export type Command = {
    (channel?: TextBaseChannel, cmd?: string[]): string,
    Alias?: string,
    BackDoor?: boolean,
    Description?: string,
    Usages?: CommandUsage
}

export interface IHandler {
    Instance: CommandExecutor;
    Prefix: string;
    Validate(msg: Message): boolean;
}

export abstract class CommandExecutor {
    protected _commands: Map<string, Command>;
    protected static commands: Map<string, Command>;

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

    public get Commands(): IterableIterator<[string, Command]> {
        return this._commands.entries();
    }

    @Executable('help', "Print this message.")
    protected Help(channel: TextBaseChannel): string {
        let response = '======Help======\n';
        for (let cmdName in this._commands.keys()) {
            let cmd = this._commands.get(cmdName);
            response += `${cmdName.padEnd(10)}: ${cmd.Description}\n`;
            if (cmd.Usages) {
                for (let [syntax, purpose] of cmd.Usages) {
                    response += ` ·${syntax.padEnd(8)}: ${purpose}\n`;
                }
            }
        }
        response += '======Help======'
        channel.send(response, { code: true });
        return
    }

    protected InstallCommand(command: Command): void {
        this._commands.set(command.Alias, command);
    }
}

export function Executable(alias: string, desc: string, usages: CommandUsage = null, backdoor = false) {
    return function (ce: any, pkey: string, descriptor: PropertyDescriptor) {
        let cmd = ce[pkey] as Command;
        console.log(ce);
        cmd.Alias = alias;
        cmd.BackDoor = backdoor;
        cmd.Description = desc;
        cmd.Usages = usages;
        if (!ce.commands) {
            ce.commands = new Map();
        }
        ce.commands.set(alias, cmd);
    };
}
