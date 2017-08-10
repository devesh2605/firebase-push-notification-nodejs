var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    FCM = require('fcm-node');
winston = require('winston');

var app = express.Router();
var env = process.env.NODE_ENV || 'development';
var serverKey = ""; //server key from firebase messaging console

var tsFormat = () => (new Date()).toLocaleTimeString();
var logger = new(winston.Logger)({
    transports: [

        new(winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'info'
        }),
        new(require('winston-daily-rotate-file'))({
            filename: './Logs/pushNotifications.log',
            timestamp: tsFormat,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: env === 'development' ? 'verbose' : 'info'
        })
    ]
});

app.post('/send', function(req, res) {
    logger.info('Api requested to sending notification');

    var message = req.body.message; //notification Title
    var title = req.body.title; //notification Body
    var key1 = req.body.key1; //extra Data
    var token = ""; //device token
    
    var message = {
        registration_ids: [token],
        notification: {
            title: title,
            body: message
        },
        data: {
            key1: key1
        }
    };

    fcm.send(message, function(err, response) {
        if (err) {
            logger.error(err);
            res.status(200).json(err)
        } else {
            logger.info(response);
            res.status(200).json(response);
        }
    });

});

module.exports = app;