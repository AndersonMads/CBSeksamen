//Henter config-filen samt mssql package
var config = require("../Database/config.json");
var sql = require("mssql");

//Laver class, så det mulliggør at kunne eksporterer samtlige async funktioner
class Admin {
  //Login-system til admin
  //Async funktion med to argumenter
  async getAdmins(user_id) {
    try {
      //Forbinder til SQL via pool
      //Sammenligner localstorage med database-data
      let pool = await sql.connect(config);
      let getAdmin = pool
        .request()
        .input("user_id", sql.Int, user_id)
        .input("admin", sql.Bit, 1)
        .query(`SELECT * FROM [dbo].[users] WHERE adm=@admin AND id=@user_id`);
      return getAdmin;
    } catch (error) {
      return;
    }
  }

  //Async funktion uden argument
  async showUsers() {
    try {
      //Forbinder til SQL via pool
      //Joiner diverse tabeller blandt andet [users] med [items] med LEFT JOIN, således at users med 0 ads også bliver vist
      //Tæller antallet af ads og gruppere omkring id og username
      //Bruger UNION til at tilføje en række ved indeholdende TOTAL
      let pool = await sql.connect(config);
      let showUser = pool.request()
        .query(`SELECT CONVERT(VARCHAR(255),u.id) as user_id,u.username, Count(i.id) as number_of_ads
        FROM users as u
          LEFT JOIN items as i
                  ON i.user_id = u.id
    GROUP BY u.id, u.username

    UNION

    SELECT 'TOTAL','TOTAL', Count(i.id)
      FROM users as u
              INNER JOIN items as i
                  ON i.user_id = u.id`);
      return showUser;
    } catch (error) {
      return console.log(error);
    }
  }

  //Admin kan delete en user
  //Async funktion med argument
  async deleteUserAdmin(user_id) {
    try {
      //
      let pool = await sql.connect(config);
      let deleteUserAdmin = pool.request().input("user_id", sql.Int, user_id)
        .query(`DELETE FROM items WHERE user_id=@user_id
        DELETE FROM users WHERE id=@user_id`);
      return deleteUserAdmin;
    } catch (error) {
      console.log(error);
    }
  }

    //Admin kan opdaterer brugeroplysninger
  //Async funktion med argumenter
  async updateUserAdmin(user_id, username, password, gold, location_id) {
    try {
      //Forbinder til SQL via pool
      //Opdaterer valgte values i SQL med input ud fra user_id
      let pool = await sql.connect(config);
      let updateUserAdmin = pool
        .request()
        .input("user_id", sql.VarChar(255), user_id)
        .input("newUsername", sql.VarChar(255), username)
        .input("newPassword", sql.VarChar(255), password)
        .input("gold", sql.Bit, gold)
        .input("newRegion", sql.Int, location_id)
        .query(
          `UPDATE users SET username=@newUsername, pswd=@newPassword, gold=@gold, location_id=@newRegion WHERE id=@user_id`
        );
      return updateUserAdmin;
    } catch (error) {
      return console.log(error);
    }
  }
}

//Eksporterer klassen
module.exports = new Admin();