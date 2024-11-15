import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"

export const sendMessage = (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        // Seguir acá

    } catch (error) {
        console.log("Error del servidor al enviar el mensaje", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}