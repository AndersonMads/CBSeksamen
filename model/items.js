var config = require('../Database/config.json')
var sql = require('mssql');


async function insertItem (i_name,category_id,price,reusables) {
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('i_name', sql.VarChar(255), i_name)
            .input('category_id', sql.Int, category_id)
            .input('price', sql.VarChar(255), price)
            .input('user_id', sql.Int, 3)
            .input('reusables', sql.Bit, reusables)
            .input('follow', sql.Bit, 0)
            .query(`INSERT INTO [dbo].[items](i_name,category_id,price,user_id,reusables,follow) VALUES (@i_name,@category_id,@price,@user_id,@reusables,@follow)`)
        return insertUser.recordsets;
    } catch (error) {
        console.log(error)
    }
}










module.exports = {
    insertItem: insertItem
}