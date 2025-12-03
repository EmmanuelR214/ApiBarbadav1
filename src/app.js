import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRoutes from './routers/user.routes.js'

const app = express()
const allowedOrigins = ['http://localhost:5173', 'http://localhost:4173', 'https://labarbada.store', 'https://app.labarbada.com/', 'https://la-barbada2.vercel.app/', 'null'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true  
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api",indexRoutes)

app.get("/api", (req, res) => {
    res.send('Bienvenido a la Api user')
})

app.get('/', (req, res) => {
    res.send('¡El API está en funcionamiento user!')
})

app.use((req,res, next)=>{
    res.status(404).json({
        message:"ruta no encontrada"
    })
})

export default app
