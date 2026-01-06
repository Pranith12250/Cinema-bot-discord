require('dotenv').config();

const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
    .setName('movie')
    .setDescription('GET MOVIE DETAILS FUCKING')
    .addUserOption(option=>option
        .setName('user')
        .setDescription('WHOSE SHIT BLOODY')
        .setRequired(true)
    )
    .addStringOption(option=>option
        .setName('name')
        .setDescription('MOVIE NAME BLOODY')
        .setRequired(true)
    ).toJSON(),

    new SlashCommandBuilder()
    .setName('time')
    .setDescription('KNOW T FUCKING TIME').toJSON()
];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

(async()=>{
    try{
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('Slash commands registered');
    }
    catch(error){
        console.error(error);
    }
})();