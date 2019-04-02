const fs = require('fs');
const mustache = require('mustache');

module.exports = (dir,file,ext, template, config) => {
	if (config) template = mustache.render(template, config);
	if (!fs.existsSync(`./${dir}`)) fs.mkdirSync(`./${dir}`);
    fs.writeFileSync(`./${dir}/${file}.${ext}`, template);
    
};
