var config = require('../Database/config.json')
var sql = require('mssql');

async function getUsers () {
    try {
        let pool = await sql.connect(config);
        let tables = pool.request().query('SELECT * from dbo.users');
        return (await tables).recordsets;
    } catch (error) {
        console.log(error)
    }
}

let user = [
    "'realtest'","'123'",1,1,"'1'"
] 

async function insertUsers (error) {
    try { 
        let pool = await sql.connect(config);
        let tables = pool.request().query(`INSERT INTO [users] (username,pswd,adm,gold,location_id) VALUES(${user[0]},${user[1]},${user[2]},${user[3]},${user[4]})`)
        console.log(`User added to database${user}`)
        return (await tables).recordsets;   
    } catch (error) {
        console.log("Username already in use")
    }
}

module.exports = {
    getUsers : getUsers,
    insertUsers : insertUsers
}