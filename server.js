const portfinder = require('portfinder');
const express = require('express');
const path = require('path');
const fs = require('fs');
const pkg = require('./package.json');

async function main() {
	const port =
		process.env.PORT ||
		(await portfinder.getPortPromise({
			port: 8000,
		}));
	const app = express();
	let server;

	// send index with injected close script
	app.get('/', function (_req, res) {
		fs.readFile(path.join(__dirname, 'app', 'index.html'), { encoding: 'utf-8' }, function (err, data) {
			if (err) {
				console.error(err);
				res.sendStatus(404);
			} else {
				res.send(
					data.replace(
						'</head>',
						`<script>
	window.addEventListener('beforeunload', function () {fetch('./close')});
</script>
</head>`
					)
				);
			}
		});
	});
	// handle close request
	app.get('/close', (_req, res) => {
		res.sendStatus(200);
		server.close();
		process.exit(0);
	});
	// host everything else as static assets
	app.use(express.static(path.join(__dirname, 'app')));

	server = app.listen(port, () => {
		const url = `http://localhost:${port}`;
		const open = require('open');
		open(url);
	});
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
