"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const config_1 = require("./config");
const handler_1 = require("./handler");
const client = new Discord.Client();
client.on('ready', () => {
    let gameChannel = client.channels.get(config_1.config.channelId);
    let readyMessage = `Logged in as ${client.user.tag}!
ready to serve ${client.users.size} users in ${client.guilds.size} servers. :heart:`;
    console.log(readyMessage);
    gameChannel.send(readyMessage);
});
client.on('message', msg => {
    let content = msg.content;
    let channel = msg.channel;
    for (let { Prefix: p, Validate: v, Instance: i } of handler_1.handlers) {
        if (content.startsWith(p) && v(msg)) {
            let cmd = content.substring(p.length).split(/\s+/);
            i.Execute(channel, cmd);
            msg.reply('Synchronous command finished.');
            return;
        }
    }
});
client.login(config_1.config.token);
//# sourceMappingURL=index.js.map