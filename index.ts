import * as Discord from 'discord.js'
import { config } from './config'
import { handlers } from './handler'

const client = new Discord.Client();

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
    let channel = msg.channel;
    for (let { Prefix: p, Validate: v, Instance: i } of handlers) {
        if (content.startsWith(p) && v(msg)) {
            let cmd = content.substring(p.length).split(/\s+/);
            i.Execute(channel, cmd);
            msg.reply('Synchronous command finished.');
            return;
        }
    }
});

client.login(config.token);
