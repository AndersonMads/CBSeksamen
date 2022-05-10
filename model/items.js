var config = require('../Database/config.json')
var sql = require('mssql');

//Laver class, så det mulliggør at kunne eksporterer samtlige async funktioner
class Items {
  //Indsætter varer
  //Async funktion med to argumenter
  async insertItem(i_name, category_id, price, user_id, reusables) {
    //Med if-statement sikres at pris bliver 0, hvis "for free?" er tilvalgt uanset input under pris
    if (reusables == 1) {
      try {
        //Forbinder til SQL via pool
        //Indsætter varer i SQL ud fra input
        let pool = await sql.connect(config);
        let insertItem = await pool
          .request()
          .input("i_name", sql.VarChar(255), i_name)
          .input("category_id", sql.Int, category_id)
          .input("price", sql.Decimal, 0)
          .input("user_id", sql.Int, user_id)
          .input("reusables", sql.Bit, 1)
          .input("follow", sql.Bit, 0)
          .query(
            `INSERT INTO [dbo].[items](i_name,category_id,price,user_id,reusables,follow) VALUES (@i_name,@category_id,@price,@user_id,@reusables,@follow)`
          );
        return insertItem.recordsets;
      } catch (error) {
        return console.log(error);
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

  //Viser varer med filtre
  //Async funktion med to argumenter
  async showItems() {
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

  //Viser egne varer
  //Async funktion med to argumenter
  async showOwnItems() {
    try {
      let pool = await sql.connect(config);
      let showOwnItems = pool
        .request()
        .query(`SELECT * from items as i
            INNER JOIN categories as c
                ON c.id = i.category_id`)
      return showOwnItems;
    } catch (error) {
      return ;
    }
  }

  //Sletter brugers egne varer
  //Async funktion med to argumenter
  async deleteOwnItems(id) {
    try {
      let pool = await sql.connect(config);
      let deleteOwnItems = pool
        .request()
        .input('id', sql.VarChar(255), id)
        .query(`DELETE FROM items WHERE id=@id`)
      return deleteOwnItems;
    } catch (error) {
      return ;
    }
  }

  //Opdaterer egne varer
  //Async funktion med to argumenter
  async updateOwnItems(id, i_name, price, category_id, reusables) {
    if(reusables==1){
    try {
      let pool = await sql.connect(config);
      let updateOwnItems = pool
        .request()
        .input('id', sql.VarChar(255), id)
        .input('i_name', sql.VarChar(255), i_name)
        .input('price', sql.Decimal, 0)
        .input('category_id', sql.Int, category_id)
        .input('reusables', sql.Bit, 1)
        .query(`UPDATE items
              SET i_name=@i_name, price=@price, category_id=@category_id, reusables=@reusables
              WHERE id=@id`)
      return updateOwnItems;
    } catch (error) {
      return ;
    }  
    } else {
      try {
        let pool = await sql.connect(config);
        let updateOwnItems = pool
          .request()
          .input('id', sql.VarChar(255), id)
          .input('i_name', sql.VarChar(255), i_name)
          .input('price', sql.Decimal, price)
          .input('category_id', sql.Int, category_id)
          .input('reusables', sql.Bit, 0)
          .query(`UPDATE items
                SET i_name=@i_name, price=@price, category_id=@category_id, reusables=@reusables
                WHERE id=@id`)
        return updateOwnItems;
      } catch (error) {
        return ;
      }  
    } 
  }

}




module.exports = new Items()