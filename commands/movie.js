const { getMovies } = require('../services/sheetServices');
const users = require('../config/users');
const { searchMovie } = require('../utils/movieSearcher');
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

        const movies_data = await getMovies(
            userSpecificData.sheetId,
            userSpecificData.range_movies,
            userSpecificData.range_oscars
        );

        const rows_movies = movies_data.rows_movies;

        const movieRow = rows_movies
                            .slice(1)
                            .find(row =>
                                (row[0] || '').trim().toUpperCase() == movieName);

        if(!movieRow){
            return reply('MOVIE NOT TER FUCKING <:nahh:725441480209989712>');
        }

        const rows_oscars = movies_data.rows_oscars;
        const movie= await searchMovie(rows_oscars, movieRow, movieName);

        const embed = formatMovie(userSpecificData.label, movie, userSpecificData.color);
        reply({embeds: [embed]});
    },
};