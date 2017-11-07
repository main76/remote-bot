import * as Discord from 'discord.js'
import { Game } from './dungeon'
import { Feature } from './feature'
import { config } from './config'
import { IHandler } from './common/command'

const client = new Discord.Client();
const handlers: IHandler[] = [
    {
        Instance:  new Feature(),
        Prefix: config.prefix.feature,
        Validate(msg: Discord.Message) {
            return msg.author.id == config.ownerId;
        }
    },
    {
        Instance:  new Game(),
        Prefix: config.prefix.dungeon,
        Validate(msg: Discord.Message) {
            return msg.channel.id == config.channelId;
        }
    }
]

// send message that indicate the bot is ready.
client.on('ready', () => {
    let gameChannel = <Discord.TextChannel>client.channels.get(config.channelId);
    let readyMessage = `Logged in as ${client.user.tag}!
ready to serve ${client.users.size} users in ${client.guilds.size} servers. :heart:`
    console.log(readyMessage);
    gameChannel.send(readyMessage);
});

// handle received messages.
client.on('message', msg => {
    let content = msg.content;
    for (let {Prefix: p, Validate: v, Instance: i} of handlers) {
        if (content.startsWith(p) && v(msg)) {
            let cmd = content.substring(p.length).split(/\s+/);
            let info = i.Execute(cmd);
            msg.reply(info);
            return;
        }
    }
});

client.login(config.token);
