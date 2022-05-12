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

//Henter classes til users og items herunder modeller
const dboperationsUsers = require("./model/users");
const dboperationsItems = require("./model/items");
const dboperationsAdmins = require("./model/admins");
const userTemplate = require("./model/userTemplate");
const itemTemplate = require("./model/itemTemplate");

//Login
app.post("/login", function (req, res) {
  //Indsætter input i class så det bliver til objekt
  let user = new userTemplate(undefined,req.body.username,req.body.password)

  //Indsætter input fra objekt og tjekker om login virker
  dboperationsUsers.getUsers(user.username,user.password).then((result) => {
    if (result.rowsAffected[0] > 0) {
      res.status(200).json(result.recordset[0].id);
    } else {
      res.status(404).send(false);
    }
  });
});

//Registrer bruger
app.post("/new", function (req, res) {
    //Indsætter input i class så det bliver til objekt
    let user = new userTemplate(undefined,req.body.username,req.body.password,undefined,undefined,undefined,req.body.region)

  //Indsætter input i SQL
  dboperationsUsers.insertUsers(user.username, user.password, user.location_id).then((result) => {
      res.status(201).json(result);
    });
});

//Laver item
app.post("/newItemCreated", function (req, res) {
  //Indsætter input i class så det bliver til objekt
  let item = new itemTemplate(undefined,req.body.itemName,req.body.category,req.body.price,req.body.user_id,req.body.reusables)

  //Indsætter input i SQL
  dboperationsItems.insertItem(item.i_name, item.category_id, item.price, item.user_id, item.reusables).then((result) => {
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
  //Indsætter input i class så det bliver til objekt
  let item = new itemTemplate(req.body.item_id)

  //Indsætter input til SQL-funktion
  dboperationsItems.deleteOwnItems(item.item_id).then((result) => {
    res.status(204).json(result);
  });
});

// Opdater egne varer
app.post("/updateOwnItems", (req, res) => {
  //Indsætter input i class så det bliver til objekt
  let item = new itemTemplate(req.body.item_id,req.body.itemName,req.body.category_id,req.body.price,undefined,req.body.reusables)

  //Indsætter input til SQL-funktion
  dboperationsItems.updateOwnItems(item.item_id, item.i_name, item.price, item.category_id, item.reusables).then((result) => {
      res.status(200).json(result);
    });
});

//Login admin
app.post("/loginAdmin", function (req, res) {
    //Indsætter input i class så det bliver til objekt
    let user = new userTemplate(JSON.stringify(req.body.admin_id))

    //Tjekker om SQL-data bliver korrekt påvirket ved indsættelse af pågældende user_id fra localstorage
    dboperationsAdmins.getAdmins(user.user_id).then((result) => {
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
    dboperationsAdmins.showUsers().then((result) => {
    res.send(result.recordset);
  });
});

// Slet user - admin funktionalitet
app.post("/deleteUserAdmin", (req, res) => {
  //Indsætter input i class så det bliver til objekt
  let user = new userTemplate(req.body.user_id)
  

  //Indsætter input i SQL-funktion
  dboperationsAdmins.deleteUserAdmin(user.user_id).then((result) => {
    res.status(204).json(result);
  });
});

// Slet egen bruger
app.post("/deleteOwnUser", (req, res) => {
  //Indsætter input i class så det bliver til objekt
  let user = new userTemplate(req.body.user_id)

    //Indsætter input i SQL-funktion
  dboperationsUsers.deleteOwnUser(user.user_id).then((result) => {
    res.status(201).json(result);
  });
});

// Opdater bruger fra Admin
app.post("/updateUserAdmin", (req, res) => {
  //Indsætter input i class så det bliver til objekt
  let user = new userTemplate(req.body.user_id,req.body.newUsername,req.body.newPassword,undefined,req.body.gold,undefined,req.body.newRegion)

  //Indsætter input i SQL-funktion
  dboperationsAdmins.updateUserAdmin(user.user_id, user.username, user.password, user.gold, user.location_id).then((result) => {
      res.status(204).json(result);
    });
});

// Opdater egen bruger
app.post("/updateUser", (req, res) => {
  //Indsætter input i class så det bliver til objekt
  let user = new userTemplate(req.body.user_id,req.body.newUsername,req.body.newPassword,undefined,undefined,undefined,req.body.newRegion)

  //Indsætter input i SQL-funktion
  dboperationsUsers.updateUser(user.user_id, user.username, user.password, user.location_id).then((result) => {
      res.status(204).json(result);
    });
});
