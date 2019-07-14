const { createServer } = require('http-server');
const open  = require('open');
const server = createServer({
	cors: true,
	root: __dirname + '/app',
});
const host = 'localhost';
server.listen(0, host, undefined, function() {
	const url = `http://${host}:${this.address().port}/index.html`;
	console.log(`Running on ${url}`);
	open(url);
});
