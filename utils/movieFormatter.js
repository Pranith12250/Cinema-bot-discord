const { EmbedBuilder }=require('discord.js');

function formatMovie(label, movie, color){
    const awardsText=
    movie.awards && movie.awards.length?movie.awards.join(', ')
    : 'NONE';

    return new EmbedBuilder()
    .setTitle(`${label}`)
    .setColor(color)
    .addFields(
        { name: 'NAME', value: movie.name || ' ', inline: true},
        { name: 'LANGUAGE', value: movie.language || ' ', inline: true},
        { name: 'AUDI', value: movie.auditorium || ' ', inline: true},
        { name: 'RATING', value: movie.rating || ' ', inline: true},
        { name: 'REVIEW', value: movie.review || ' '},
        { name: 'AWARDS', value: awardsText || ' '},
    )
    .setTimestamp();
}

module.exports={ formatMovie };