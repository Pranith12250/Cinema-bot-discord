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
        const awardHeaders = rows_oscars[2] || [];
        const awardRows = rows_oscars.slice(3);
        let awards=[];

        for(let colIndex=0; colIndex<awardHeaders.length;colIndex++){
            const awardName=awardHeaders[colIndex];

            const found=awardRows.some(row=>{
                const cell=(row[colIndex]||'').toUpperCase();
                return cell.includes(movieName);
            });

            if(found && awardName){
                awards.push(awardName);
            }
        }
        const movie = {
            name: (movieRow[0] || '').toUpperCase(),
            language: (movieRow[1] || '').toUpperCase(),
            auditorium: (movieRow[3] || '').toUpperCase(),
            rating: (movieRow[4] || '').toUpperCase(),
            review: (movieRow[5] || '').toUpperCase(),
            awards
        };

        const embed = formatMovie(userSpecificData.label, movie, userSpecificData.color);
        reply({embeds: [embed]});
    },
};