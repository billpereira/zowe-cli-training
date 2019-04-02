const readFile = require('./readFile');
const writeFile = require('./writeFile');
const execCmd = require('./execCmd');

const main = async () => {
	let response = '';

	// * Create LIST Rexx---

	let datasetName = {
		datasetName: process.argv[2]
	};
	let dir = 'build';
	let file = 'custom';

	let rexxTemplate = readFile('listDSN.rexx').toString();
	writeFile(dir, file, 'rexx', rexxTemplate, datasetName);

	console.log(
		`REXX to display ${datasetName.datasetName} created at ${dir}/${file} \n`
	);

	// * --------------------
	// * Upload Rexx      ---

	let hlq = 'A028356.REXX.OOS.TECHDAY';
	let commandUpload = `zowe files upload ftds "${dir}/${file}.rexx" "${hlq}.${file}"`;
	response = await execCmd(commandUpload);
	console.log(response);

	// * --------------------
	// * Exec Rexx        ---
	let account = 'AEA1';
	let commandExec = `zowe tso issue command "EXEC '${hlq}.${file}'" -a ${account}`;
	response = await execCmd(commandExec);

	response = response.match(/\{(.|\n)*\}/g)[0];

	writeFile(dir, 'config', 'json', response);

	// * --------------------
    // * Alloc new        ---
    let templateCreateNewJCL = readFile('createNew.jcl').toString();
    let newConfig = JSON.parse(response)
    newConfig.SYSPRIMARY = newConfig.SYSPRIMARY*2
	writeFile(dir,'allocnew','jcl',templateCreateNewJCL,newConfig)
	
	let commandSubmit = `zowe jobs submit lf "./${dir}/allocnew.jcl" --directory "./output"`

	response = await execCmd(commandSubmit);

	console.log(response)
        
	// * --------------------
};

main();

// // -- listar as caracteristicas do dataset --
// let commandExec =

// exec(commandExec, (err, stdout, stderr) => {
//     if (err) console.log(err)
//     if (stdout) fs.writeFileSync(`listConfig.json`, stdout.toString();
//     if (stderr) console.log(stderr.toString());
// });

// const readConfig = () => {
//     try{
//         return JSON.parse(fs.readFileSync('listConfig.json'));
//     } catch(e){
//         console.log('The data is empty...');
//         return [];
//     };
// };

// let config = readConfig()

// console.log(config)

// console.log(respExec)
// -- Alocar o .NEW com 10% a mais de espaço --
// -- Copiar do antigo para o novo --
// -- renames --
