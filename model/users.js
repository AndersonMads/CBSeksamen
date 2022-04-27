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
        .query(
          `SELECT * FROM [dbo].[users] WHERE username=@username AND pswd=@pswd UPDATE today_date SET date_generated=sysdatetime() WHERE id=1`
        );
      return getUser;
    } catch (error) {
      return;
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
      return;
    }
  }

  /* The outer (left) join will return NULL for those persons that do not have an appointment.
    The aggregate function count() will not count NULL values and thus you'll not get a zero.
  */
  async showUsers() {
    try {
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
      console.log(error);
    }
  }

  async deleteUserAdmin(user_id) {
    try {
      let pool = await sql.connect(config);
      let deleteUserAdmin = pool.request().input("user_id", sql.Int, user_id)
        .query(`DELETE FROM items WHERE user_id=@user_id
        DELETE FROM users WHERE id=@user_id`);
      return deleteUserAdmin;
    } catch (error) {
      console.log(error);
    }
  }


  async deleteOwnUser(user_id) {
    try {
      let pool = await sql.connect(config);
      let deleteOwnUser = pool
        .request()
        .input('user_id', sql.VarChar(255), user_id)
        .query(`DELETE FROM items WHERE user_id=@user_id
                  DELETE FROM users WHERE id=@user_id`)
      return deleteOwnUser;    
    } catch (error) {
        console.log(error);
    }
  }
  
  //Opdater også adresse!!
  async updateUserAdmin(user_id, newUsername, newPassword, gold) {
    try {
      let pool = await sql.connect(config);
      let updateUserAdmin = pool
        .request()
        .input("user_id", sql.VarChar(255), user_id)
        .input("newUsername", sql.VarChar(255), newUsername)
        .input("newPassword", sql.VarChar(255), newPassword)
        .input("gold", sql.Bit, gold)
        .query(
          `UPDATE users SET username=@newUsername, pswd=@newPassword, gold=@gold WHERE id=@user_id`
        );
      return updateUserAdmin;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserAdmin(user_id, newUsername, newPassword, gold, newRegion) {
    try {
      let pool = await sql.connect(config);
      let updateUserAdmin = pool
        .request()
        .input("user_id", sql.VarChar(255), user_id)
        .input("newUsername", sql.VarChar(255), newUsername)
        .input("newPassword", sql.VarChar(255), newPassword)
        .input("gold", sql.Bit, gold)
        .input("newRegion", sql.Int, newRegion)
        .query(
          `UPDATE users SET username=@newUsername, pswd=@newPassword, gold=@gold, location_id=@newRegion WHERE id=@user_id`
        );
      return updateUserAdmin;
    } catch (error) {
      console.log(error);
    }
  }


  async updateUser(user_id, newUsername, newPassword, newRegion) {
    try {
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

module.exports = new User();
