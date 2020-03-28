const app = require('./app');
const http = require('http');
const port = process.argv[2] || 3000;
const server = http.createServer();
const mongoUtil = require('./db/db');
const config = require('./env/env');


mongoUtil.connectToServer((err) => {
    if (err) throw err;
    server.listen(port, config.ip, () => {
        console.log(`http://${server.address().address}:${server.address().port}`);
    });
    server.on('request', app);

    app.get('/', (req, res) => {
        res.send('<html><title>Node-mongo-boilerplate</title></html>');
    });

    const validation = require('./routes/validation');

    app.use('/validation/', validation);
})