const runCmd = require('child_process').exec;
const Discord = require('discord.js');
const client = new Discord.Client();
const shell = require('shelljs')

const token = 'Mzc1MTkyMDE2MDQyMDY1OTIy.DNsQUg.YG7G-7Ju6c520XkAmqZNU0WJdsg';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
});

client.login(token);
