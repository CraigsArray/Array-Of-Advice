const express = require("express");
const app = express();
const mongoose = require("mongoose");
const peopleModel = require("./models/people");
const path = require("path");
require('dotenv').config()

const cors = require("cors");

app.use(express.json());
const PORT = process.env.PORT || 8080;
app.use(cors());

mongoose.connect(process.env.MONGODB_URL);

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

// server static assets if in production
if(process.env.NODE_ENV === 'production'){    
    app.use(express.static('client/build'))  // set static folder 
    //returning frontend for any route other than api 
    app.get('*',(req,res)=>{     
        res.sendFile (path.resolve(__dirname,'client','build',         
                      'index.html' ));    
    });
}