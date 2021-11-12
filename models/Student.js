const mongoose = require('mongoose')
const Schema = mongoose.Schema


//construir schema

const studentSchema = new Schema ({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true, max: 99},
    class: {type: String, enum: ["A", "B"]},
    pendingBills: {type: Boolean, default: false},
    idioma: {type: String}
}, { versionKey: false, timestamps: true})

module.exports = mongoose.model('Student', studentSchema)  // recibe como 1er argumento el nombre del model y como 2do el nombre del schema