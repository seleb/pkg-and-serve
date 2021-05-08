const { createServer } = require('http-server');
const open  = require('open');
const pkg  = require('./package.json');
const server = createServer({
	cors: true,
	root: __dirname + '/app',
});
const host = 'localhost';
const port = 0;
server.listen(port, host, undefined, function() {
	const url = `http://${host}:${this.address().port}/index.html`;
	console.log(`${pkg.name} running on ${url}`);
	open(url);
});
