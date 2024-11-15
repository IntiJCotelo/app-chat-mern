import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ error: "No autorizado - Token no proporcionado" })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken) {
            return res.status(401).json({ error: "No autorizado - Token inválido" })
        }

        const user = await User.findById(decodedToken.userId)

        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado" })
        }

        req.user = user

        next()
        
    } catch (error) {
        console.log("Error del servidor al proteger la ruta", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }    
}

export default protectRoute