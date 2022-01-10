const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const port = process.env.PORT || 3003;

const app = express();

// setting the view engine
app.set('view engine', 'hbs');

// express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.get("/flag", (req, res) => {
    res.render('index.hbs')
})

// listening on $PORT
app.listen(port, () => {
    console.log('Server up on port ' + port);
})