const { getMovies } = require('../services/sheetServices');
const users = require('../config/users');
const { formatMovie } = require('../utils/movieFormatter');

module.exports={
    name: 'movie',

    async execute({username, movieName, reply}){
        const userSpecificData=users[username];

        if(!userSpecificData){
            return reply(
                'U R NOT A SHITTER. MAINTAIN UR OWN SHIT B4ASKING I2READ UR SHIT'
            );
        }

        const movies = await getMovies(
            userSpecificData.sheetId,
            userSpecificData.range_movies,
            userSpecificData.range_oscars
        );

        const movie = movies.find(m=>m.name == movieName);

        if(!movie){
            return reply('MOVIE NOT TER FUCKING <:nahh:725441480209989712>');
        }

        const embed = formatMovie(userSpecificData.label, movie, userSpecificData.color);
        reply({embeds: [embed]});
    },
};