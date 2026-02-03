function normalize(str){
    return str.replace(/[^\w\s]/g, '')
              .trim()
              .toUpperCase();
}

module.exports = {normalize};