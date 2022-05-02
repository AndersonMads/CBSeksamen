const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Middleware
app.use(express.static(__dirname + "/view/"));

//Server running
app.listen(PORT, function () {
  console.log(`Server listens to ${PORT}`);
});

//Henter classes til users og items
const dboperationsUsers = require("./model/users");
const dboperationsItems = require("./model/items");

//Login
app.post("/login", function (req, res) {
    //Henter input
  let username = req.body.username;
  let password = req.body.password;

  //Indsætter input i SQL-constructor og tjekker om login virker
  dboperationsUsers.getUsers(username, password).then((result) => {
    if (result.rowsAffected[0] > 0) {
      res.status(200).json(result.recordset[0].id);
    } else {
      res.status(404).send(false);
    }
  });
});

//Registrer bruger
app.post("/new", function (req, res) {
    //Henter input
  let username = req.body.username;
  let password = req.body.password;
  let location_id = req.body.region;

  //Indsætter input i SQL
  dboperationsUsers
    .insertUsers(username, password, location_id).then((result) => {
      res.status(201).json(result);
    });
});

//Laver item
app.post("/newItemCreated", function (req, res) {
    //Henter input
  let user_id = req.body.user_id;
  let price = req.body.price;
  let category = req.body.category;
  let i_name = req.body.itemName;
  let reusables = req.body.reusables;

  //Indsætter input i SQL
  dboperationsItems.insertItem(i_name, category, price, user_id, reusables).then((result) => {
      res.status(201).json(result);
    });
});

//Ser alle items
app.get("/showItems", (req, res) => {
    //Sender SQL-data til URI
  dboperationsItems.showItems().then((result) => {
    res.send(result.recordset);
  });
});

// Se dine egne varer
app.get("/showOwnItems", (req, res) => {
    //Sender SQL-data til URI
  dboperationsItems.showOwnItems().then((result) => {
    res.send(result.recordset);
  });
});

// Slet egne varer
app.post("/deleteOwnItems", (req, res) => {
    //Henter input
  let id = req.body.username;
    //Indsætter input til SQL-funktion
  dboperationsItems.deleteOwnItems(id).then((result) => {
    res.status(204).json(result);
  });
});

// Opdater egne varer
app.post("/updateOwnItems", (req, res) => {
    //Henter input
  let id = req.body.id;
  let itemName = req.body.itemName;
  let price = req.body.price;
  let category = req.body.category;
  let reusable = req.body.reusable;

  //Indsætter input til SQL-funktion
  dboperationsItems.updateOwnItems(id, itemName, price, category, reusable).then((result) => {
      res.status(200).json(result);
    });
});

//Login admin
app.post("/loginAdmin", function (req, res) {
    //Henter localstorage data
  let user_id = JSON.stringify(req.body.admin_id);

    //Tjekker om SQL-data bliver korrekt påvirket ved indsættelse af pågældende user_id fra localstorage
  dboperationsUsers.getAdmins(user_id).then((result) => {
    if (result.rowsAffected[0] > 0) {
      res.status(200).send(result.recordset[0].adm);
    } else {
      res.status(404).send(false);
    }
  });
});

//Ser antal annoncer pr bruger samt total antal
app.get("/showListofUsers", (req, res) => {
    //Henter annoncer pr bruger samt total antal annoncer fra SQL
  dboperationsUsers.showUsers().then((result) => {
    res.send(result.recordset);
  });
});

// Slet user - admin funktionalitet
app.post("/deleteUserAdmin", (req, res) => {
    //Henter input
  let user_id = req.body.user_id;

  //Indsætter input i SQL-funktion
  dboperationsUsers.deleteUserAdmin(user_id).then((result) => {
    res.status(204).json(result);
  });
});

// Slet egen bruger
app.post("/deleteOwnUser", (req, res) => {
    //Henter input
  let user_id = req.body.user_id;

    //Indsætter input i SQL-funktion
  dboperationsUsers.deleteOwnUser(user_id).then((result) => {
    res.status(201).json(result);
  });
});

// Opdater bruger fra Admin
app.post("/updateUserAdmin", (req, res) => {
    //Henter input
  let user_id = req.body.user_id;
  let newUsername = req.body.newUsername;
  let newPassword = req.body.newPassword;
  let gold = req.body.gold;
  let newRegion = req.body.newRegion;

  //Indsætter input i SQL-funktion
  dboperationsUsers.updateUserAdmin(user_id, newUsername, newPassword, gold, newRegion).then((result) => {
      res.status(204).json(result);
    });
});

// Opdater egen bruger
app.post("/updateUser", (req, res) => {
    //Henter input
  let user_id = req.body.user_id;
  let newUsername = req.body.newUsername;
  let newPassword = req.body.newPassword;
  let newRegion = req.body.newRegion;

  //Indsætter input i SQL-funktion
  dboperationsUsers.updateUser(user_id, newUsername, newPassword, newRegion).then((result) => {
      res.status(204).json(result);
    });
});
