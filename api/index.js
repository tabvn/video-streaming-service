const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const {Server} = require('uws');
const {connection} = require('./connection');
const {routers} = require('./router');
const {connect} = require('./db');
const {dbName} = require('./config');
const Model = require('./models');
const cors = require('cors');

const PORT = 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({exposedHeaders: '*'}));

app.server = http.createServer(app);


// Setup Websocket Server.
app.wss = new Server({server: app.server});
app.connections = new connection(app);
app.routers = routers(app);

// Connect to Mongodb
connect((err, client) => {

    if(err){
        throw err;
    }
    app.db = client.db(dbName);

});

// Set Models

app.models = new Model(app);



// Start server
app.server.listen(PORT, () => {

    console.log(`Server is running on: http://localhost:${PORT}`);
});
