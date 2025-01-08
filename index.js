// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript develo>// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on('messageCreate', message => {
    if (!message.content.startsWith('nana') || message.author.bot) return;

    const args = message.content.split(' ');
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command!');
    }
});
// Log in to Discord with your client's token
client.login(token);
