const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    publication_id: { type: mongoose.Schema.Types.ObjectId, ref: 'publications' },
    vote: String,
    commentaire: String,
    users_like: Array,
    users_dislike: Array,
    date: String
})

const commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel;