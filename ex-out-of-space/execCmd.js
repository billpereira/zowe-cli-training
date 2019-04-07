const { exec } = require('child_process');

const execZowe = cmd =>
	new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			}
			console.log(stdout)
			resolve(stdout ? stdout : stderr);
		});
	});

module.exports = execZowe;
