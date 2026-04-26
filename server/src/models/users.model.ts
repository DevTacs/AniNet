import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: false,
        trim: true,
        minlength: 6,
    },
    googleId: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        required: false,
        default: "https://github.com/shadcn.png",
    },
})

const User = mongoose.model("User", userSchema)

export default User
