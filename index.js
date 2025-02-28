require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Global variable to store the latest deleted/edited message
let lastSniped = { type: null, content: null, author: null, channel: null };

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Log messages that start with "nana"
client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("nana")) {
        const logEntry = `[${message.guild?.name || "DM"} | ${message.channel.name} | ${message.author.tag}]: ${message.content}\n`;
        console.log(logEntry.trim());
        fs.appendFile("log.md", logEntry, (err) => {
            if (err) console.error("Error logging message:", err);
        });
    }

    // Snipe command to retrieve last deleted/edited message
    if (message.content.toLowerCase() === "snipe") {
        if (lastSniped.content) {
            message.reply(`**${lastSniped.type} Message by ${"<@" + lastSniped.author + ">"}:**\n${lastSniped.content}`);
        } else {
            message.reply("No recently deleted or edited messages found.");
        }
    }
});

// Store last deleted message
client.on("messageDelete", (message) => {
    if (message.author.bot || !message.content) return;

    lastSniped = {
        type: "Deleted",
        content: message.content,
        author: message.author.tag,
        channel: message.channel.name,
    };
});

// Store last edited message
client.on("messageUpdate", (oldMessage, newMessage) => {
    if (oldMessage.author.bot || oldMessage.content === newMessage.content) return;

    lastSniped = {
        type: "Edited",
        content: `~~${oldMessage.content}~~ → **${newMessage.content}**`,
        author: oldMessage.author.id,
        channel: oldMessage.channel.name,
    };
});

client.login(process.env.DISCORD_BOT_TOKEN);
