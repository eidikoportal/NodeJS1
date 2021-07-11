require('./models/db');

const express = require('express');
const Handlebars = require('handlebars');
const path = require('path');
const exprhbs = require('express-handlebars'); 
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const bodyparser = require('body-parser'); 

const employeeController = require('./Controller/employeeController');

var app = express();
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exprhbs({handlebars: allowInsecurePrototypeAccess(Handlebars),extname: 'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

app.listen(3000,()=>{console.log('express server started at 3000');});

app.use('/employee',employeeController);