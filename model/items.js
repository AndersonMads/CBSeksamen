var config = require('../Database/config.json')
var sql = require('mssql');



//Laver item
async function insertItem (i_name,category_id,price,user_id,reusables) {
    try {
        let pool = await sql.connect(config);
        let insertItem = await pool.request()
            .input('i_name', sql.VarChar(255), i_name)
            .input('category_id', sql.Int, category_id)
            .input('price', sql.VarChar(255), price)
            .input('user_id', sql.Int, user_id)
            .input('reusables', sql.Bit, reusables)
            .input('follow', sql.Bit, 0)
            .query(`INSERT INTO [dbo].[items](i_name,category_id,price,user_id,reusables,follow) VALUES (@i_name,@category_id,@price,@user_id,@reusables,@follow)`)
        return insertItem.recordsets;
    } catch (error) {
        console.log(error)
    }
}

async function showItems() {
    try {
      let pool = await sql.connect(config);
      let showItems = pool
        .request()
        .query(`SELECT i.i_name, i.price, i.reusables, i.follow, c.c_name, u.username, datediff(day,i.date_created,t.date_generated) as differ, u.gold
        FROM items as i
            INNER JOIN categories as c
                ON c.id = i.category_id
            INNER JOIN users as u
                ON i.user_id = u.id
            INNER JOIN today_date as t
                ON i.today_date_id = t.id
                ORDER BY u.gold DESC`)
      return showItems;
    } catch (error) {
      return ;
    }
  }










module.exports = {
    insertItem: insertItem,
    showItems: showItems
}