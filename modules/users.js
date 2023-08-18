const mongoose = require('mongoose')
const user_schema = mongoose.Schema({
    username:String,
    email:String,
    pass:String
},{
    versionKey:false
}
)
const User_modle = mongoose.model('user',user_schema)

module.exports = {
    User_modle
}