class itemTemplate {
    constructor(item_id,i_name,category_id,price,user_id,reusables,category,date_created,follow,today_date_id,today_date) {
        this.item_id = item_id;
        this.i_name = i_name;
        this.category_id = category_id;
        this.price = price;
        this.user_id = user_id;
        this.reusables = reusables;
        this.category = category;
        this.date_created = date_created;
        this.follow = follow;
        this.today_date_id = today_date_id;
        this.today_date = today_date;
    }
}

module.exports = itemTemplate