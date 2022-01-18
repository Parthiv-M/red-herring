const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database');
const FlagModel = require('./models/FlagModel');

const port = process.env.PORT || 3003;

connectDB()

const app = express();

// express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/test/nginx", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send({ message: "This route is working, implying that your API call worked" })
})

app.get("/hash", (req, res) => {
    const flag = "wtfCTF{4_h45h_4nd_4P1_g33k}";

    const str = flag.split("");
    
    let i, n;
    let sum = 0;
    for (i = 0; i < 15; i++) {
        n = str[i];
        sum = sum + n.charCodeAt();
    }
    
    let hash = sum * (sum + 1);
    
    console.log("Your flag is: ", hash);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send({ hash: hash })
})

app.post("/create/flag", (req, res) => {
    try {
        if(req.headers.api_auth === process.env.API_AUTH) {
            let flag = new FlagModel({
                flag: req.body.flag
            })
            flag.save().then((data) => {
                res.status(200).send(data)
            })
        } else {
            res.status(402).send({ message: "Access denied" })
        }   
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server error" })
    }
})

app.get("/flag/db", async (req, res) => {
    try {
        let flags = await FlagModel.find({})
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send({flags})
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server error" })
    }
})

// listening on $PORT
app.listen(port, () => {
    console.log('Server up on port ' + port);
})