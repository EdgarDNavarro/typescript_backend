import express from "express";
import colors from "colors";
import cors, { CorsOptions } from 'cors'
import router from "./router";
import morgan from "morgan";
import db from "./config/db";

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.magenta('BD conectada'))
    } catch (error) { 
        // console.log(error);
        console.log(colors.red.bold("Hubo un error al conectarr con la BD"));
    }
}
connectDB()

const server = express()

const corsOptions: CorsOptions = {
    origin: function(origin, callbac) {
        if(origin === process.env.FRONTEND_URL) {
            callbac(null, true)
        } else {
            callbac(new Error('Denegado por Cors'))
        }
    }
}
server.use(cors(corsOptions))
server.use(morgan('dev'))
server.use(express.json())
server.use('/api/products', router)
server.get('/api', (req, res) => {
    res.json({msg: "Desde api"})
})


export default server