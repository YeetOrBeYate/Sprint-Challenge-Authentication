const db = require("../database/dbConfig.js");

const insert = (user)=>{
    return db("users")
    .insert(user)
    .returning("id")
}

const loggin = (user)=>{
    return db
    .select('username', 'password')
    .from('users')
    .where({"username": user.username})
    .first()
}

module.exports = {
    insert,
    loggin
}