// dependencies =============================
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
const util = require('util');
var logger = require('morgan');
var path = require('path');
//var favicon = require('serve-favicon');

var config = require('./utils/config.js');

// variables =============================
var viewengine="ejs";

// app init =============================
var app=new express();

app.set("views", path.join(__dirname, "views/" + viewengine));
app.set("view engine", viewengine);
app.set('view options', { layout: 'layout' });
app.use(expressLayouts);

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

// app routes =============================
app.use("/", require("./routes/index"));

app.use(function(req, res, next)
{
    var err=new Error("Not found!");
    err.status=404;
    next(err);
});

// start server =============================
var server=app.listen(config.server.port, function()
{
    var host=server.address().address;
    var port=server.address().port;
    console.log("Backend is running on %s:%s", host, port);

});