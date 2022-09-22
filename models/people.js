const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    statement: {
        type: String,
        required: true,
    },
});

const peopleModel = mongoose.model("people", peopleSchema)

module.exports = peopleModel;