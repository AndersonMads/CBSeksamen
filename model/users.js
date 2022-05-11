//Henter config-filen samt mssql package
var config = require("../Database/config.json");
var sql = require("mssql");

//Laver class, så det mulliggør at kunne eksporterer samtlige async funktioner
class User {
  //Login-system til normale hjemmeside
  //Async funktion med to argumenter
  async getUsers(username, password) {
    //Forbinder til SQL via pool
    //Sammenligner input med database-data
    try {
      let pool = await sql.connect(config);
      let getUser = pool
        .request()
        .input("username", sql.VarChar(255), username)
        .input("pswd", sql.VarChar(255), password)
        .query(
          `SELECT * FROM [dbo].[users] WHERE username=@username AND pswd=@pswd`
        );
      return getUser;
    } catch (error) {
      return console.log(error);
    }
  }

  //Registrer bruger
  //Async funktion med argumenter
  async insertUsers(username, password, location_id) {
    try {
      //Forbinder til SQL via pool
      //Indsætter input-data til SQL
      let pool = await sql.connect(config);
      let insertUser = await pool
        .request()
        .input("username", sql.VarChar(255), username)
        .input("pswd", sql.VarChar(255), password)
        .input("adm", sql.Bit, 0)
        .input("gold", sql.Bit, 0)
        .input("location_id", sql.Int, location_id)
        .query(
          `INSERT INTO [dbo].[users](username,pswd,adm,gold,location_id) VALUES (@username,@pswd,@adm,@gold,@location_id)`
        );
      return insertUser.recordsets;
    } catch (error) {
      console.log(error);
    }
  }

  //Bruger kan slette egen profil
  //Async funktion med to argumenter
  async deleteOwnUser(user_id) {
    try {
      //Forbinder til SQL via pool
      //Fjerne brugere og varer, hvis bruger_id er lig med input
      let pool = await sql.connect(config);
      let deleteOwnUser = pool
        .request()
        .input("user_id", sql.VarChar(255), user_id)
        .query(`DELETE FROM items WHERE user_id=@user_id
                  DELETE FROM users WHERE id=@user_id`);
      return deleteOwnUser;
    } catch (error) {
      return console.log(error);
    }
  }

  //Bruger kan opdaterer egne oplysninger
  //Async funktion med argumenter
  async updateUser(user_id, newUsername, newPassword, newRegion) {
    try {
      //Forbinder til SQL via pool
      //Opdaterer valgte values i SQL med input ud fra user_id
      let pool = await sql.connect(config);
      let updateUserAdmin = pool
        .request()
        .input("user_id", sql.VarChar(255), user_id)
        .input("newUsername", sql.VarChar(255), newUsername)
        .input("newPassword", sql.VarChar(255), newPassword)
        .input("newRegion", sql.Int, newRegion)
        .query(
          `UPDATE users SET username=@newUsername, pswd=@newPassword, location_id=@newRegion WHERE id=@user_id`
        );
      return updateUserAdmin;
    } catch (error) {
      console.log(error);
    }
  }
}

//Eksporterer klassen
module.exports = new User();
