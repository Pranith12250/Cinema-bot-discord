const Fuse = require('fuse.js');
const { normalize } = require('./normalize');

function confidenceCalculator(confidenceVal){
    let value = (1 - confidenceVal)*100;
    return value.toFixed(2)+'%';
}

function findMovieRow(rows_movies, movieName){
    if(!rows_movies) return null;

    const data = rows_movies.slice(1).map(row=>({
        title: normalize(row[1] || ''),
        row
    }));

    const fuse = new Fuse(data,{
        keys: ['title'],
        ignoreDiacritics: true,
        threshold: 0.3,
        shouldSort: true,
        ignoreLocation: true,
        distance: 100,
        minMatchCharLength: 3,
        includeScore: true
    });

    const results = fuse.search(normalize(movieName));

    if(!results.length)
        return null;

    const { row } = results[0].item;
    row.push(movieName);
    row.push(confidenceCalculator(results[0].score));

    return row;
}

module.exports = {findMovieRow};