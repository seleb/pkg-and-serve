#! /usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const path = require('path');
const fse = require('fs-extra');
const config = require('../pkg.config.json');
const { execSync } = require('child_process');
const argv = yargs(hideBin(process.argv))
	.command('* [source] [output]', 'package a folder as a self-serving executable', yargs => {
		yargs
			.positional('source', {
				describe: 'folder to package',
				type: 'string',
				default: '.',
			})
			.positional('output', {
				describe: 'optional output name',
				type: 'string',
			});
	})
	.help().argv;
const source = argv.source ? path.join(process.cwd(), argv.source) : process.cwd();
const output = argv.output ? path.join(process.cwd(), argv.output) : process.cwd();
fse.rmSync(path.join(__dirname, '..', 'app'), { recursive: true });
fse.copySync(source, path.join(__dirname, '..', 'app'));
execSync('npm run build', {
	cwd: path.join(__dirname, '..'),
	stdio: 'inherit',
});
fse.copySync(path.join(__dirname, '..', config.pkg.outputPath), output);
console.log(`Packaged "${source}" to "${output}"`);
