const commands = require("../commands/index");

module.exports=async function messageHandler(message) {
    if(message.author.bot)
        return;
    if(!message.content.startsWith('!'))
        return;

    const args = message.content.trim().split(/\s+/);
    const commandName = args[0].slice(1).toLowerCase();

    const command = commands[commandName];
    if(!command)
        return;

    switch (commandName){
        case 'movie':{
            const mentionedUser = message.mentions.users.first();
            if(!mentionedUser){
                return message.reply('WHOSE FUCKING SHIT SHUD I ACCESS BICH');
            }

            const movieName=args.slice(2).join(' ').toUpperCase();
            if(!movieName){
                return message.reply('WER TF IS T MOVIE NEM BLOODY FUKING BLASTARD');
            }

            try{
                await command.execute({
                    username: mentionedUser.username,
                    movieName,
                    reply:(text)=>message.reply(text),
                    ephemeralReply:(text)=>message.reply(text),
                });
            }
            catch(err){
                console.error(err);
                message.reply('U MED I FUCKING CRASH. SAY SORRY NOW BILLLLAAAAAADDDDYYYYYY');
            }
            break;
        }

        case 'time':{
            await command.execute({
                reply: (text)=>message.reply(text)
            });
            break;
        }


        default:
            break;
    
    }
};