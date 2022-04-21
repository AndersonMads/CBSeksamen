const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const insertUsers = require('./model/users');
const getUsers = require('./model/users');
const insertItem = require('./model/items');

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
const dbOperations = require(__dirname + '/model/items.js')

//Login
app.post('/login', function (req,res) {

    let username = req.body.username
    let password = req.body.password


    dboperations.getUsers(username,password).then(result => {
        res.status(201).json(result)
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



console.log(fweljfewjfpew)
//Laver item
app.post('/newItemCreated', function (req, res){
    let price = req.body.price
    let category = req.body.category
    let i_name = req.body.itemName
    let reusables = req.body.reusables

    dbOperations.insertItem(i_name,category,price,reusables).then(result => {
        res.status(201).json(result)
    })
   
})
