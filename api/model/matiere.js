let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    id: Number,
    nomProf:String,
    pathProf:String,
    matiere: String,
    pathImage: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Matiere', MatiereSchema);