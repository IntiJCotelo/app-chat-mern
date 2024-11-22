import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado", socket.id)
    
    
    socket.on("disconnect", () => {
        console.log("Usuario desconectado", socket.id)
    })
})

export { app, io, server }