const mongoose = require('mongoose')

const publicationSchema = mongoose.Schema({
    thematique: String,
    titre: String,
    texte: String,
    image: String,
    date_publication: String,
    statut: Boolean,
    motsCle: String,
    publiToken: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
})

const publicationModel = mongoose.model('publications', publicationSchema);

module.exports = publicationModel;