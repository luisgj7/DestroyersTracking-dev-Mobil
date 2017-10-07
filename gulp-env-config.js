var path = require('path'),
	fs = require('fs'),
	ip = require('ip'),
	yargs = require('yargs');

function getEnv() {
	let dev = (yargs.argv.dev || process.env.npm_config_dev) ? 'dev' : undefined;
	let production = (yargs.argv.production || process.env.npm_config_production) ? 'production' : undefined;
	let local = (!dev && !production) ? 'local' : undefined;

	return local || dev || production;
}

function replaceEnv(env, file) {
	let envPattern = /ENV(\s)?=(\s)?('|")([a-z]+|\s)?('|")(;)?/i;
	return file.replace(envPattern, `ENV = '${env}';`);
}

function replaceIP(file) {
	let ipPattern = /IP(\s)?=(\s)?('|")([0-9|\.]+)?('|")(;)?/i;
	return file.replace(ipPattern, `IP = '${ip.address()}';`);
}

function execConfig(filePath, file) {
	let env = getEnv();

	file = replaceEnv(env, file);

	if (env === 'local') file = replaceIP(file);

	fs.writeFileSync(filePath, file, { encoding: 'utf8' });
	console.log(`\t   > Set up "${env}" environment, at IP address ${ip.address()}`);
}

module.exports = function () {
	let filePath = path.resolve(__dirname, 'src/app/core/config.service.ts');
	let file = fs.readFileSync(filePath, 'utf8');

	execConfig(filePath, file);
};
