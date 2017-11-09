import { Message, TextChannel, DMChannel, GroupDMChannel } from 'discord.js'

export type TextBaseChannel = TextChannel | DMChannel | GroupDMChannel;

export type CommandUsage = [string, string][];

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

    public Execute(channel: TextBaseChannel, cmd: string[]): void {
        try {
            let [cmdName, ...restArgs] = cmd;
            let command: Command = this._commands.get(cmdName);
            if (!command) {
                channel.send(`unexpected command ${cmdName}`);
                return;
            }
            let info = command.bind(this)(channel, restArgs);
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
        let response = '===============Help===============\n';
        for (let [alias, cmd] of this._commands.entries()) {
            let cmd = this._commands.get(alias);
            response += `${alias.padEnd(10)}: ${cmd.Description}\n`;
            if (cmd.Usages) {
                for (let [syntax, purpose] of cmd.Usages) {
                    response += ` ·${syntax.padEnd(8)}: ${purpose}\n`;
                }
            }
        }
        response += '===============Help===============';
        channel.send(response, { code: true });
        return
    }
}

export function Executable(alias: string, desc: string, usages: CommandUsage = null, backdoor = false) {
    return function (target: any, pkey: string, descriptor: PropertyDescriptor) {
        let className: string = target.constructor.name;
        let cmd: Command = descriptor.value;
        cmd.Alias = alias;
        cmd.BackDoor = backdoor;
        cmd.Description = desc;
        cmd.Usages = usages;

        target.shadowCollections = target.shadowCollections || {}
        let shadowCollections = target.shadowCollections;

        shadowCollections[className] = shadowCollections[className] || new Map();
        let collection: Map<string, Command> = shadowCollections[className];

        collection.set(alias, cmd);
    };
}

export function SetupCommands<T extends { new(...args: any[]): {} }>(ctor: T) {
    let all: [string, Function][] = [];
    function* getClassNames(_ctor: T) {
        while (_ctor && _ctor.name) {
            yield _ctor.name;
            _ctor = Object.getPrototypeOf(_ctor);
        }
    }
    for (let className of getClassNames(ctor)) {
        let current: Map<string, Function> = ctor.prototype.shadowCollections[className];
        all.push(...current);
    }
    all.sort(([a,], [b,]) => a < b ? -1 : (a > b ? 1 : 0));
    delete ctor.prototype.shadowCollections;
    return class extends ctor {
        _commands = new Map(all);
    }
}
