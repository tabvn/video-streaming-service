const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const {Server} = require('uws');
const {connection} = require('./connection');
const {routers} = require('./router');


const PORT = 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.server = http.createServer(app);


// Setup Websocket Server.
app.wss = new Server({server: app.server});
app.connections = new connection(app);
app.routers = routers(app);






// Start server
app.server.listen(PORT, () => {

    console.log(`Server is running on: http://localhost:${PORT}`);
});
