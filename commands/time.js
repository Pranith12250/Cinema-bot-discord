const { execute } = require("./movie");

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

        reply(
            `***TIME RN*** <:HurryTheFuckUp:735374060065914931>
**TOASTY TIME:** ${georgiaTime}
**BODD TIME:** ${ukTime}
**SRK & MEMELORD TIME:** ${localTime}`
        );
    }
}


