const fs = require('fs');
const mustache = require('mustache')

// -----------------------------------------------------------
// Read config json and the template JCL
// -----------------------------------------------------------

const readConfig = () => {
    try{
        return JSON.parse(fs.readFileSync('config.json'));
    } catch(e){
        console.log('The data is empty...');
        return [];
    };
};

const readJCL = () => {
    try{
        return fs.readFileSync('hello-world.jcl').toString();
    } catch(e){
        console.log('The data is empty...');
        return [];
    };
}

let config = readConfig();
let JCL = readJCL();

// -----------------------------------------------------------
// Use mustache to build the jcl to be submited
// -----------------------------------------------------------

let buildJCL = mustache.render(JCL,config)

if (!fs.existsSync('./build')) fs.mkdirSync('./build');

fs.writeFileSync('./build/custom.jcl', buildJCL);

console.log('Generated custom JCL to ./build/custom.jcl\n');