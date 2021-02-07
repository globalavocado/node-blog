const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://localhost/test', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, database) => {
        if (err) return console.log(err)
        db = database.db('test')
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`Server running on port ${port}`));
})

// cors
app.use(cors());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.collection('blog').find().toArray(function(err, result) {
        if (err) return console.log(err)
        res.render('index.ejs', {posts: result})
    })
});