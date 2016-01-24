var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 7000,
    router = express.Router(),
    app = express();

/* config */

app.use(bodyParser());
mongoose.connect('mongodb://10.135.235.53:27017/');
var fruitSchema = mongoose.Schema({
    name: String,
    color: String
});

var Fruit = mongoose.model('metropia_db', fruitSchema);

router.route('/')
    .get(function (req, res) {
        Fruit.find(function(err, fruits) {
            if (err)
                res.send(err);
            res.send(fruits);
        });
    })



app.use(router);

app.listen(port);