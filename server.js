const { createServer } = require('http-server');
const open  = require('open');
const server = createServer({
	cors: true,
	root: __dirname + '/app',
});
const host = 'localhost';
const port = 0;
server.listen(port, host, undefined, function() {
	const url = `http://${host}:${this.address().port}/index.html`;
	console.log(`Running on ${url}`);
	open(url);
});
