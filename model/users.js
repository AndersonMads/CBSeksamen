class User {
    constructor(id,username,pswd,adm,gold,date_created,location_id) {
        this.id = id;
        this.username = username;
        this.pswd = pswd;
        this.adm = adm;
        this.gold = gold;
        this.date_created = date_created;
        this.location_id = location_id;
    }
}

module.exports= User;