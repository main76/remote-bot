import * as Discord from 'discord.js'
import { Feature, Terminal } from './feature'
import { config } from './config'
import { IHandler } from './common/command'

export const handlers: IHandler[] = [
    {
        Instance: new Feature(),
        Prefix: config.prefix.feature,
        Validate(msg: Discord.Message) {
            return msg.author.id == config.ownerId;
        }
    },
    {
        Instance: new Terminal(),
        Prefix: config.prefix.terminal,
        Validate(msg: Discord.Message) {
            return msg.author.id == config.ownerId;
        }
    }
]
