var mongoose = require('mongoose');

const URL_BDD = `mongodb+srv://agora:agora159@agora.1xrxc.mongodb.net/agora?retryWrites=true&w=majority`

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect(URL_BDD, 
    options,
    function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('___ BDD OK___')
        }
        
    }
)
module.exports = mongoose