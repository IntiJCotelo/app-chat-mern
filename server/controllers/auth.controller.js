import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Las contraseñas no coinciden" })
        }

        const userExists = await User.findOne({ username })
        
        if (userExists) {
            return res.status(400).json({ error: "El nombre de usuario ya está en uso" })
        } 

        // Encriptación de contraseña
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // API que genera avatar aleatorio para la foto de perfil (https://avatar-placeholder.iran.liara.run/)
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({ 
                message: "Usuario creado exitosamente",
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: "Error al crear el usuario" })
        }
        
    } catch (error) {
        console.log("Error del servidor al crear el usuario", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ error: "Debe completar todos los campos" })
        }

        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '') // Para manejar algún error de bcrypt

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "El nombre de usuario o la contraseña son incorrectos" })
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error del servidor al iniciar sesión", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }   
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Sesión cerrada exitosamente" })
    } catch (error) {
        console.log("Error del servidor al cerrar sesión", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}