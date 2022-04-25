var config = require("../Database/config.json");
var sql = require("mssql");
const res = require("express/lib/response");

async function getUsers(username, password) {
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

async function insertUsers(username, password, location_id) {
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

async function getAdmins(user_id) {
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

module.exports = {
  getUsers: getUsers,
  insertUsers: insertUsers,
  getAdmins: getAdmins
};
