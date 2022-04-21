const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const insertUsers = require('./model/users');
const getUsers = require('./model/users');

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Middleware
app.use(express.static(__dirname + '/view/'));

//Server running
app.listen(PORT,function () {
    console.log(`Server listens to ${PORT}`)
});


const dboperations = require(__dirname + '/model/users.js')


//Login
app.post('/loginInput', function (req,res) {

    let username = req.body.username
    let password = req.body.password

    
    dboperations.getUsers(username,password).then(result => {
        res.status(200).json(result)
    })
});

//Registrer bruger
app.post('/new', function (req,res) {

    let username = req.body.username
    let password = req.body.password
    let location_id = req.body.region

    dboperations.insertUsers(username,password,location_id).then(result => {
        res.status(201).json(result)
    })
    console.log(username,password,location_id)
});