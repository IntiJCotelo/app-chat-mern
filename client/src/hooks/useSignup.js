import toast from "react-hot-toast"
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext" 

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender })
        if (!success) {
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data))

            setAuthUser(data)

        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, signup}
}

export default useSignup

const handleInputErrors = ({ fullName, username, password, confirmPassword, gender }) => {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Todos los campos son obligatorios")
        return false
    }

    if (password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden")
        return false
    }

    if (password.length < 6) {
        toast.error("La contraseña debe tener al menos 6 caracteres")
        return false
    }

    return true
}