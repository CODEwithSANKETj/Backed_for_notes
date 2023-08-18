const mongoose = require('mongoose')
const note_schema = mongoose.Schema({
    title:String,
    body:String,
    userID:String,
    user:String
},
{
    versionKey : false
}
)
const Note_modle = mongoose.model('note',note_schema)
module.exports ={
    Note_modle
}