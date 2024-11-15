import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Previene que se pueda acceder a la cookie desde el navegador
        sameSite: 'strict', // Previene que la cookie sea enviada en solicitudes cruzadas
        secure: process.env.NODE_ENV !== 'development'
    })
}

export default generateTokenAndSetCookie