const fs = require('fs');

module.exports = (file) => {
    try{
        return fs.readFileSync(file)
    } catch(e){
        console.log('The data is empty...');
        return [];
    };
};