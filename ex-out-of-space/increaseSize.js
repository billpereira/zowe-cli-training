const readFile = require('./readFile');
const writeFile = require('./writeFile');
const execCmd = require('./execCmd');

const main = async () => {
	let response = '';
	
	// * --------------------
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

	console.log('Current config of your dataset \n',response)

	// * --------------------
	// * Alloc new        ---
	let templateCreateNewJCL = readFile('createNew.jcl').toString();
	let newConfig = JSON.parse(response);
	newConfig.SYSPRIMARY = newConfig.SYSPRIMARY * 2;
	writeFile(dir, 'allocnew', 'jcl', templateCreateNewJCL, newConfig);

	let commandSubmit = `zowe jobs submit lf "./${dir}/allocnew.jcl" --directory "./output"`;

	response = await execCmd(commandSubmit);

	console.log(response);

	// * --------------------
};

main();
