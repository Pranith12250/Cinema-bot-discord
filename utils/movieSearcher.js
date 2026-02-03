async function searchMovieOscars(rows_oscars, movieRow, movieName) {
    const awardHeaders = rows_oscars[2] || [];
    const awardRows = rows_oscars.slice(3);
    let awards=[];

    for(let colIndex=0; colIndex<awardHeaders.length;colIndex++){
        const awardName=awardHeaders[colIndex];

        const found=awardRows.some(row=>{
            const cell=(row[colIndex]||'').toUpperCase();
            return cell.includes(movieRow[1].toUpperCase());
        });

        if(found && awardName){
            awards.push(awardName.toUpperCase());
        }
    }

    return {
        date: (movieRow[0] || ''),
        name: (movieRow[1] || '').toUpperCase(),
        language: (movieRow[2] || '').toUpperCase(),
        auditorium: (movieRow[4] || '').toUpperCase(),
        rating: (movieRow[5] || '').toUpperCase(),
        review: (movieRow[6] || '').toUpperCase(),
        awards,
        searchTerm: (movieRow[7] || ''),
        confidence: (movieRow[8] || '')
    };
}

module.exports={ searchMovieOscars };