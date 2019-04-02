const execCmd = require('./execCmd');

let datasetToApf = process.argv[2];
let volser = process.argv[3];

const checkIfAlreadyApfed = async datasetToApf => {
	let command = `zowe console issue command 'd prog,apf'`;
	let response = await execCmd(command);
	if (response.indexOf(datasetToApf) >= 0) {
		console.log(`>>>Dataset ${datasetToApf} already APFed`);
		return true;
	}
	return false;
};

const returnApfCommand = (datasetToApf, volser) =>
	volser === 'SMSVOL'
		? `zowe console issue command 'SETPROG APF,ADD,DSNAME=${datasetToApf},SMS'`
		: `zowe console issue command 'SETPROG APF,ADD,DSNAME=${datasetToApf},VOLUME=${volser}'`;

const apf = async (datasetToApf, volser) => {
    
    if (!datasetToApf) {
		console.log('>>>dsname invalid');
		return 0;
    }
    
	let isApfed = await checkIfAlreadyApfed(datasetToApf);
	if (isApfed) return 0;
	if (!volser) volser = 'SMSVOL';
	let command = returnApfCommand(datasetToApf, volser);

	execCmd(command);

	console.log(command);
	console.log('>>>dataset apfed');
};

apf(datasetToApf, volser);
