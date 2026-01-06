const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile:'discord-movie-bot-483317-877b225a7b35.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});

const sheets = google.sheets({version:'v4', auth});

async function getMovies(sheet_id, range_movies, range_oscars) {
    const res_movies = await sheets.spreadsheets.values.get({
        spreadsheetId: sheet_id,
        range: range_movies
    });

    const res_oscars = await sheets.spreadsheets.values.get({
        spreadsheetId: sheet_id,
        range: range_oscars
    });

    const rows_movies = res_movies.data.values || [];
    const rows_oscars = res_oscars.data.values || [];

    const awardHeaders = rows_oscars[2] || [];
    const awardRows = rows_oscars.slice(3);

    return rows_movies.slice(1).map(movieRow=>{
        const movieName = (movieRow[0] || '').toUpperCase();
        const awards=[];

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

        return{
            name: (movieRow[0] || '').toUpperCase(),
            language: (movieRow[1] || '').toUpperCase(),
            auditorium: (movieRow[3] || '').toUpperCase(),
            rating: (movieRow[4] || '').toUpperCase(),
            review: (movieRow[5] || '').toUpperCase(),
            awards
        };
    });
}

module.exports={getMovies};