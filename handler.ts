import * as Discord from 'discord.js'
import { Game } from './dungeon'
import { Feature } from './feature'
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
        Instance: new Game(),
        Prefix: config.prefix.dungeon,
        Validate(msg: Discord.Message) {
            return msg.channel.id == config.channelId;
        }
    }
]
