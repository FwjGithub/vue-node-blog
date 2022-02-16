const userSchema = new mongoose.Schema({
    poster: String,
    title: String,
    tags: Array,
    content: String,
    html: String,
    views: Number,
    cDate: Date,
    uDate: Date
})



module.exports = {
    userSchema
}