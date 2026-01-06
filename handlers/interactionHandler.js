const commands=require('../commands/index');

module.exports=async function interactionHandler(interaction) {
    if(!interaction.isChatInputCommand())
        return;

    const commandName = interaction.commandName;
    const command = commands[commandName];

    if(!command)
        return;

    switch(commandName){
        case 'movie':{
            const mentionedUser=interaction.options.getUser('user');
            const movieName=interaction.options.getString('name').toUpperCase();

            try{
                await interaction.deferReply();

                await command.execute({
                    username: mentionedUser.username,
                    movieName,
                    reply: (text)=>interaction.editReply(text),
                    ephemeralReply: (text)=>interaction.reply({content:text, ephemeralReply:false}),
                });
            }
            catch(err){
                console.error(err);
                interaction.editReply({
                    content: 'YOU MED I FUCKING CRASH. SAY SPRRY NOW BILLLLLAAAADDDDYYYYY',
                    ephemeral: false,
                });
            }
            break;
        }
        
        case 'time':{
            await command.execute({
                reply: (text)=>interaction.reply(text)
            });
            break;
        }

        default:
            break;
    }
};