const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

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
        if(result.rowsAffected[0] > 0) {
            res.status(200).json(result.recordset[0].id)
        } else {
            res.status(404).send(false)
        };
    });
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

//Laver item
app.post('/newItemCreated', function (req, res){
    let user_id = req.body.user_id
    let price = req.body.price
    let category = req.body.category
    let i_name = req.body.itemName
    let reusables = req.body.reusables

    dbOperations.insertItem(i_name,category,price,user_id,reusables).then(result => {
        res.status(201).json(result)
    });
   
});

//Ser items
app.get('/showItems', (req, res) => {
    dbOperations.showItems().then(result => {
        res.send(result.recordset)
    });
});

// Se dine egne varer
app.get('/showOwnItems', (req, res) => {
 
    dbOperations.showOwnItems().then(result => {
        res.send(result.recordset)
    });
});

// Slet egne varer
app.post('/deleteOwnItems', (req,res) => {

    let id = req.body.username

    dbOperations.deleteOwnItems(id).then(result => {
        res.status(201).json(result)
    });
});