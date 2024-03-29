import express, { json, urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(json({
    limit: "16kb"
}))

app.use(urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(cookieParser())
app.use(express.static("public"))

// routes import
import BannerRouter from "./routes/Banner.routes.js"
import UserRouter from "./routes/User.routes.js"

// routes declaration
app.use("/api/v1/user",UserRouter)
app.use("/api/v1/product",BannerRouter)
export {app}