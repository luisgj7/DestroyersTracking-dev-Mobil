const path = require('path'),
	fs = require('fs'),
	readline = require('readline'),
	yargs = require('yargs');

const VERSION_TYPES = {
	MAJOR: 'major',
	MINOR: 'minor',
	PATCH: 'patch',
	BUILD: 'build'
};

function getCurrentVersion(text) {
	let index = text.match(/version="*"/i).index;
	return text.substr(index).split('"')[1];
}

function getVersionType(argv) {
	if (!argv) argv = yargs.argv;

	if (argv.major) return VERSION_TYPES.MAJOR;
	if (argv.minor) return VERSION_TYPES.MINOR;
	return VERSION_TYPES.PATCH;
}

function getNewVersion(line) {
	let digits = getCurrentVersion(line).split('.').map(digit => Number(digit));

	switch (getVersionType()) {
		case VERSION_TYPES.MAJOR:
			digits[0] += 1;
			digits[1] = digits[2] = 0;
			break;
		case VERSION_TYPES.MINOR:
			digits[1] += 1;
			digits[2] = 0;
			break;
		default:
			digits[2] += 1;
	}

	return digits.join('.');
}

function execConfig() {
	let currentVersion, newVersion, content = '';
	let filePath = path.resolve(__dirname, 'config.xml');
	let input = fs.createReadStream(filePath);
	let lineReader = readline.createInterface({ input });

	lineReader
		.on('line', line => {
			if ((line.indexOf('widget') > -1) && (line.indexOf('version') > -1)) {
				currentVersion = getCurrentVersion(line);
				newVersion = getNewVersion(line);
				line = line.replace(/version="([0-9|\.]+)?"/i, `version="${newVersion}"`);
			}
			content += line + '\n';
		})
		.on('close', () => {
			fs.writeFileSync(filePath, content, { encoding: 'utf8' });
			console.log(`\t   > Updated app version: "${currentVersion}" -> "${newVersion}" (${getVersionType()})`);
		});
}

module.exports = {
	getType: getVersionType,
	exec: execConfig,
};
