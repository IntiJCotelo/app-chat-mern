import mongoose from 'mongoose'

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Base de datos conectada')
    } catch (err) {
        console.log('Error al conectar la base de datos', err)
    }
}

export default connectToMongoDB