const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Serveren kører på http://localhost:3000')
});

var db = require('./controller/users')
var User = require('./model/users')
const dboperations = require('./controller/users')

dboperations.insertUsers().then(result => {
    console.log(result)
})