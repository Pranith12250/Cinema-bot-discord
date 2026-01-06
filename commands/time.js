const { EmbedBuilder }=require('discord.js');

module.exports={
    name: 'time',

    async execute({ reply }){
        const localTime = new Intl.DateTimeFormat('en-UK',{
            timeZone: 'Asia/Kolkata',
            dateStyle:'medium',
            timeStyle:'short'
        }).format(new Date());

        const georgiaTime = new Intl.DateTimeFormat('en-UK',{
            timeZone: 'America/New_York',
            dateStyle:'medium',
            timeStyle: 'short'
        }).format(new Date());

        const ukTime = new Intl.DateTimeFormat('en-UK',{
            timeZone: 'Europe/London',
            dateStyle:'medium',
            timeStyle:'short'
        }).format(new Date());

        const embed = new EmbedBuilder()
    .setTitle(`TIME RN <:HurryTheFuckUp:735374060065914931>`)
    .setColor(0xE50914)
    .addFields(
        { name: 'TOASTY TIME', value: georgiaTime, inline: false},
        { name: 'BODD TIME', value: ukTime || ' ', inline: false},
        { name: 'SRK & MEMELORD TIME', value: localTime, inline: false},
    )
    .setTimestamp();

        reply(
            {embeds: [embed]}
        );
    }
}


