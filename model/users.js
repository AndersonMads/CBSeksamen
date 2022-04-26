var config = require("../Database/config.json");
var sql = require("mssql");


class User {
  async getUsers(username, password) {
    try {
      let pool = await sql.connect(config);
      let getUser = pool
        .request()
        .input("username", sql.VarChar(255), username)
        .input("pswd", sql.VarChar(255), password)
        .query(`SELECT * FROM [dbo].[users] WHERE username=@username AND pswd=@pswd UPDATE today_date SET date_generated=sysdatetime() WHERE id=1`);
      return getUser;
    } catch (error) {
      return ;
    }
  }
  
  async insertUsers(username, password, location_id) {
    try {
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
  
  async getAdmins(user_id) {
    try {
      let pool = await sql.connect(config);
      let getAdmin = pool
        .request()
        .input("user_id", sql.Int, user_id)
        .input("admin", sql.Bit, 1)
        .query(`SELECT * FROM [dbo].[users] WHERE adm=@admin AND id=@user_id`);
      return getAdmin;
    } catch (error) {
      return ;
    }
  }
  
  async showUsers() {
    try {
      let pool = await sql.connect(config);
      let showUser = pool
        .request()
        .query(`SELECT u.id, Count(i.id) as number_of_ads
        FROM users as u
              INNER JOIN items as i
                  ON i.user_id = u.id
          GROUP BY u.id
          ORDER BY number_of_ads DESC`)
      return showUser;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new User()
