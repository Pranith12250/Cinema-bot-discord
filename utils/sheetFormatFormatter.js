const { EmbedBuilder }=require('discord.js');

function formatSheetFormat(rows, color){

    const labelledRows = [
    [" ", ...rows[0].map((_, i) => getColLabel(i))],
    ...rows.map((row, i) => [`${i + 1}`, ...row])
   ];

   const colWidths = labelledRows[0].map((_, colIndex) => 
    Math.max(...labelledRows.map(row => String(row[colIndex] ?? "").length))
  );

   const formattedRows = labelledRows.map(row => 
     row.map((cell, i) => String(cell ?? "").padEnd(colWidths[i])).join(" | ")
  );

    const separator = colWidths.map(w => "-".repeat(w)).join("-+-");

    const finalTable = `\`\`\`\n${formattedRows[0]}\n${separator}\n${formattedRows.slice(1).join("\n")}\n\`\`\``;

    return new EmbedBuilder()
    .setTitle(`SHIT1 FORMAT`)
    .setColor(color)
    .setDescription(finalTable)
    .setTimestamp();
}

function getColLabel(i){
    let label = '';
    while (i >= 0) {
        label = String.fromCharCode((i % 26) + 65) + label;
        i = Math.floor(i / 26) - 1;
    }
    return label;
}

module.exports={ formatSheetFormat };