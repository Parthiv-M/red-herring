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

app.get("/hash", async (req, res) => {
    try {
        let flags = await FlagModel.find({ isHashed: true })
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.status(200).send({flags})
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server error" })
    }
})

app.post("/create/flag", (req, res) => {
    try {
        if(req.headers.api_auth === process.env.API_AUTH) {
            let flag = new FlagModel({
                flag: req.body.flag,
                isHashed: req.body.isHashed
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
        let flags = await FlagModel.find({ isHashed: false })
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