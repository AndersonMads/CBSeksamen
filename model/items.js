var config = require('../Database/config.json')
var sql = require('mssql');



//Laver item
async function insertItem (i_name,category_id,price,user_id,reusables) {
    //Med if-statement sikres at pris bliver 0, hvis reusables er valgt til - uanset input under pris
    if(reusables==1) {
        try {
            let pool = await sql.connect(config);
            let insertItem = await pool.request()
                .input('i_name', sql.VarChar(255), i_name)
                .input('category_id', sql.Int, category_id)
                .input('price', sql.Decimal, 0)
                .input('user_id', sql.Int, user_id)
                .input('reusables', sql.Bit, 1)
                .input('follow', sql.Bit, 0)
                .query(`INSERT INTO [dbo].[items](i_name,category_id,price,user_id,reusables,follow) VALUES (@i_name,@category_id,@price,@user_id,@reusables,@follow)`)
            return insertItem.recordsets;
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            let pool = await sql.connect(config);
            let insertItem = await pool.request()
                .input('i_name', sql.VarChar(255), i_name)
                .input('category_id', sql.Int, category_id)
                .input('price', sql.Decimal, price)
                .input('user_id', sql.Int, user_id)
                .input('reusables', sql.Bit, 0)
                .input('follow', sql.Bit, 0)
                .query(`INSERT INTO [dbo].[items](i_name,category_id,price,user_id,reusables,follow) VALUES (@i_name,@category_id,@price,@user_id,@reusables,@follow)`)
            return insertItem.recordsets;
        } catch (error) {
            console.log(error)
        }
    }
}

async function showItems() {
    try {
      let pool = await sql.connect(config);
      let showItems = pool
        .request()
        .query(`SELECT i.i_name, i.price, i.reusables, i.follow, i.date_created, c.c_name, u.username, datediff(day,t.date_generated,i.date_created)*(-1) as date_difference, u.gold, l.region
        FROM items as i
            INNER JOIN categories as c
                ON c.id = i.category_id
            INNER JOIN users as u
                ON i.user_id = u.id
            INNER JOIN today_date as t
                ON i.today_date_id = t.id
            INNER JOIN locations as l
                ON u.location_id = l.id
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