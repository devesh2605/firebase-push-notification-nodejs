var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var cors = require('cors');

/*Import Required Routers*/
var NotificationRouters = require('./Routers/NotificationRouters');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

var PORT = process.env.PORT || 3000;

/*Routers*/
app.use('/pushNotification',NotificationRouters);

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});