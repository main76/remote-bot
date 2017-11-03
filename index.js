"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const dungeon_1 = require("./dungeon");
const feature_1 = require("./feature");
const config_1 = require("./config");
const client = new Discord.Client();
const handlers = [
    {
        Instance: new feature_1.Feature(),
        Prefix: config_1.config.prefix.feature,
        Validate(msg) {
            return msg.author.id == config_1.config.ownerId;
        }
    },
    {
        Instance: new dungeon_1.Game(),
        Prefix: config_1.config.prefix.dungeon,
        Validate(msg) {
            return msg.channel.id == config_1.config.channelId;
        }
    }
];
client.on('ready', () => {
    let gameChannel = client.channels.get(config_1.config.channelId);
    let readyMessage = `Logged in as ${client.user.tag}!
ready to serve ${client.users.size} users in ${client.guilds.size} servers. :heart:`;
    console.log(readyMessage);
    gameChannel.send(readyMessage);
});
client.on('message', msg => {
    let content = msg.content;
    handlers.forEach(handler => {
        let { Prefix: p, Validate: v, Instance: i } = handler;
        if (content.startsWith(p) && v(msg)) {
            let cmd = content.substring(p.length).split(/\s+/);
            let info = i.ExecCommand(cmd);
            msg.reply(info);
        }
    });
});
client.login(config_1.config.token);
//# sourceMappingURL=index.js.map