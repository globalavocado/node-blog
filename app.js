const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://localhost/', 
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

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send('Ciao mondo e ciao tutti!'));

app.get('/blogposts', (req, res) => {
    console.log('ciaaaaaaaaaooooooo bella!')
    res.render('index.ejs')
})