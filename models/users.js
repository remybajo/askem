const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token :  String,
    gender : String,
    dateOfBirth : Number,
    CSP : String,
    civilState : String,
    numberOfcChild : Number,
    validation : Boolean,
 
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel