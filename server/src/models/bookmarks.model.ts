import mongoose from "mongoose"

const bookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    animeId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
})

const Bookmark = mongoose.model("Bookmark", bookmarkSchema)
export default Bookmark
