import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
    } catch (err) {
        console.error("DB connection error:", err)
        process.exit(1)
    }
}
