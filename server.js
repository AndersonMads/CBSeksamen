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


const dboperationsUsers = require('./model/users')
const dboperationsItems = require('./model/items')

//Login
app.post('/login', function (req,res) {

    let username = req.body.username
    let password = req.body.password

    dboperationsUsers.getUsers(username,password).then(result => {
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

    dboperationsUsers.insertUsers(username,password,location_id).then(result => {
        res.status(201).json(result)
    })
});

//Laver item
app.post('/newItemCreated', function (req, res){
    let user_id = req.body.user_id
    let price = req.body.price
    let category = req.body.category
    let i_name = req.body.itemName
    let reusables = req.body.reusables

    dboperationsItems.insertItem(i_name,category,price,user_id,reusables).then(result => {
        res.status(201).json(result)
    });
   
});

//Ser alle items
app.get('/showItems', (req, res) => {
    dboperationsItems.showItems().then(result => {
        res.send(result.recordset)
    });
});

// Se dine egne varer
app.get('/showOwnItems', (req, res) => {
 
    dboperationsItems.showOwnItems().then(result => {
        res.send(result.recordset)
    });
});

// Slet egne varer
app.post('/deleteOwnItems', (req,res) => {

    let id = req.body.username

    dboperationsItems.deleteOwnItems(id).then(result => {
        res.status(204).json(result)
    });
});

// Opdater egne varer
app.post('/updateOwnItems', (req,res) => {

    let id = req.body.id
    let itemName = req.body.itemName
    let price = req.body.price
    let category = req.body.category
    let reusable = req.body.reusable

    dboperationsItems.updateOwnItems(id, itemName, price, category, reusable).then(result => {
        res.status(200).json(result)
    });
});
//Login admin
app.post('/loginAdmin', function (req,res) {

    let user_id = JSON.stringify(req.body.admin_id)

    dboperationsUsers.getAdmins(user_id).then(result => {
        if(result.rowsAffected[0] > 0) {
            res.status(200).send(result.recordset[0].adm)
        } else {
            res.status(404).send(false)
        };
    });
});

//Ser antal annoncer per bruger
app.get('/showListofUsers', (req, res) => {
    dboperationsUsers.showUsers().then(result => {
        res.send(result.recordset)
    });
});

// Slet user - admin funktionalitet
app.post('/deleteUserAdmin', (req,res) => {

    let user_id= req.body.user_id

    dboperationsUsers.deleteUserAdmin(user_id).then(result => {
        res.status(204).json(result)
    });
});



// Slet egen bruger
app.post('/deleteOwnUser', (req,res) => {

    let user_id = req.body.user_id

    dboperationsUsers.deleteOwnUser(user_id).then(result => {
        res.status(201).json(result)
    });
});

// Opdater bruger fra Admin
app.post('/updateUserAdmin', (req,res) => {

    let user_id= req.body.user_id
    let newUsername = req.body.newUsername
    let newPassword = req.body.newPassword
    let gold = req.body.gold

    dboperationsUsers.updateUserAdmin(user_id, newUsername, newPassword, gold).then(result => {
        res.status(204).json(result)
    });
});