import User from '../models/user.model.js'

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        // Obtener todos los usuarios menos el que hizo la petición (se especifica no obtener las contraseñas)
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error del servidor al obtener los usuarios", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}