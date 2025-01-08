require('dotenv').config(); //initializes dotenv
const Discord = require('discord.js'); //imports discord.js

const client = new Discord.Client(); //creates new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
//this line must be at the very end
client.login(process.env.CLIENT_TOKEN); //signs the bot in with token