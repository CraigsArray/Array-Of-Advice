const express = require("express");
const app = express();
const mongoose = require("mongoose");
const peopleModel = require("./models/people");
const path = require("path");

const cors = require("cors");

app.use(express.json());
const PORT = process.env.PORT || 8080;
app.use(cors());

mongoose.connect("mongodb+srv://clewis1337:Spacemad12!@cluster0.z089wpf.mongodb.net/the-array-of-everyone?retryWrites=true&w=majority");

app.get("/getPeople", (req, res) => {  //req: front end, res: back end
    peopleModel.find({}, (err, result) => { //get all data then run callback function
            if (err){
                console.log("Oops, error: " + err)
            } else {
                res.json(result)
                console.log(result)
            }
    })
})

app.post("/createPerson", async (req, res) => { //async so we can wait for front end
    const person = req.body;
    const newPerson = new peopleModel(person);
    await newPerson.save();

    res.json(person);
})


app.listen(3001, () => {
    console.log("Server running on 3001");
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
   }