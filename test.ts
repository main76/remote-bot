import * as Discord from 'discord.js'
import { handlers } from './handler'
import { createInterface } from 'readline'

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const channel = {
    send(content: string, option?: any) {
        console.log(content);
    }
} as Discord.TextChannel

rl.on('line', function (content) {
    for (let { Prefix: p, Validate: v, Instance: i } of handlers) {
        if (content.startsWith(p)) {
            let cmd = content.substring(p.length).split(/\s+/);
            i.Execute(channel, cmd);
            console.log('@developer, Synchronous command finished.');
            return;
        }
    }
});

console.log('Ready!');

