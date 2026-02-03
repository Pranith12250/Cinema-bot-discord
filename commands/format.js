const { getAllRows } = require('../services/sheetServices');
const users = require('../config/users');
const { formatSheetFormat } = require('../utils/sheetFormatFormatter');

module.exports={
    name: 'format',

    async execute({username,reply}){
        const userSpecificData=users[username];

        const rows = await getAllRows(userSpecificData.sheetId);

        const headerRowIndex= findHeaderRow(rows);
        const headerLastColIndex=rows[headerRowIndex].length;
        const formatRows= rows.slice(0,headerRowIndex+1)
                              .map(row=> row.slice(0,headerLastColIndex));
        
        const embed= formatSheetFormat(formatRows, userSpecificData.color);
        reply({embeds: [embed]});
    }
}

function findHeaderRow(rows){

    const ALWAYS_PRESENT_HEADERS = ['MOVIE', 'LANGUAGE', 'DATE'];
    for(let x=0; x<rows.length;x++){
        const row= rows[x].map(localNormalize);

        const hasAllAPH = ALWAYS_PRESENT_HEADERS.every(req=>
            row.includes(req)
        );

        if(hasAllAPH){
            return x;
        }
        return null;
    }
}

function localNormalize(str){
    return str.toString().trim().toUpperCase();
}