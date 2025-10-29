import User from "../models/user.model"

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existEmail = await User.findOne({ email })
        if (existEmail) {
            res.status(400).json({ message: "email already exists !" })
        }
    } catch (error) {
        console.log('Error', error)
    }
}