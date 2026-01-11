async function searchMovie(rows_oscars, movieRow, movieName) {
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
            awards.push(awardName.toUpperCase());
        }
    }

    return {
        name: (movieRow[0] || '').toUpperCase(),
        language: (movieRow[1] || '').toUpperCase(),
        auditorium: (movieRow[3] || '').toUpperCase(),
        rating: (movieRow[4] || '').toUpperCase(),
        review: (movieRow[5] || '').toUpperCase(),
        awards
    };
}

module.exports={ searchMovie };