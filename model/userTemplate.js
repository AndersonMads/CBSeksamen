class userTemplate {
    constructor(user_id,username,password,admin,gold,follow,date_created,location_id,location) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.gold = gold;
        this.follow = follow;
        this.date_created = date_created;
        this.location_id = location_id;
        this.location = location;
    }
}

module.exports = userTemplate