import ConnectDB from "./db/ConnectDB.js";
import dotenv from "dotenv"
import { app } from "./app.js";


dotenv.config({
    path: './env'
})


ConnectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000)
    console.log(`Servr is running at port : ${process.env.PORT}`)
})
.catch((err) =>{
    console.log("Mongo db connection failed",err)
})