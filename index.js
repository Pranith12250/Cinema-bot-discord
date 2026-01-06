require('dotenv').config();

const { Client, GatewayIntentBits, MessageActivityType } = require('discord.js');

const messageHandler = require('./handlers/messageHandler');
const interactionHandler = require('./handlers/interactionHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('messageCreate', messageHandler);
client.on('interactionCreate', interactionHandler);

client.once('clientReady', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);