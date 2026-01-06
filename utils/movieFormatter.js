const { EmbedBuilder }=require('discord.js');

function formatMovie(label, movie, color){
    const awardsText=
    movie.awards && movie.awards.length?movie.awards.join(', ')
    : 'NONE';

    return new EmbedBuilder()
    .setTitle(`${label}`)
    .setColor(color)
    .addFields(
        { name: 'NAME', value: movie.name || ' ', inline: false},
        { name: 'LANGUAGE', value: movie.language || ' ', inline: false},
        { name: 'AUDI', value: movie.auditorium || ' ', inline: false},
        { name: 'RATING', value: movie.rating || ' ', inline: false},
        { name: 'REVIEW', value: movie.review || ' '},
        { name: 'AWARDS', value: awardsText || ' '},
    )
    .setTimestamp();
}

module.exports={ formatMovie };