var mongoose = require('mongoose');

const URL_BDD = `mongodb+srv://remybajo:Marseille13!@cluster0.yl9rz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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