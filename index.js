const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const password = 'BZcPMegVezKdsIpo';

const uri = "mongodb+srv://mangoUser:BZcPMegVezKdsIpo@cluster0.yih8d.mongodb.net/todolistdb?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

client.connect(err => {
    const taskList = client.db("todolistdb").collection("task");

    //CRUD OPERATION STEP 1 -- READ
    app.get("/tasks", (req, res) => {
        taskList.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })


    //CRUD OPERATION STEP 1 -- CREATE
    app.post("/addTask", (req, res) => {
        const task = req.body;
        taskList.insertOne(task)
            .then(result => {
                console.log('data added successfully');
                res.redirect('/');
            })
    })




});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000);