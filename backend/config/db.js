import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('mongodb is connected'))
        .catch((err) => console.log('mongodb error', err))
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;