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

    return{
        rows_movies,
        rows_oscars
    };
}

module.exports={getMovies};