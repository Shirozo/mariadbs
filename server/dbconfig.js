import express from "express"
import mysql from 'mysql'
import cors from 'cors'

const pool = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '457566',
    database: 'mariadb'
})

const app = express()
app.use(cors())

app.get("/", (req, res) => {
    pool.query("SELECT * FROM data", (err, result) => {
        if (err) return res.json({"Message" : "Erorr"})
        return res.json(result)
    })
        
})  

app.listen(8081, () => {
    console.log("listening to 8081")
})


