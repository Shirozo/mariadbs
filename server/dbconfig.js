import express from "express"
import mariadb from 'mariadb'
import cors from 'cors'

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '457566',
    database: 'mariadb'
})

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    try {
        const conn = await pool.getConnection()
        const result = await conn.query("SELECT * FROM data ORDER BY name")
        conn.end()
        return res.json(result)
    }
    catch (err) {
        return res.json({"Message" : "An error occured"})
    }
    // pool.query("SELECT * FROM data ORDER BY name", (err, result) => {
    //     if (err) return res.json({"Message" : "Erorr"})
    //     return res.json(result)
    // })
        
})  

app.post("/addstudent", async (req, res) => {
    try {
        const conn = await pool.getConnection()
        const que = await conn.query(`INSERT INTO data (name, number, address, occupation)
                                     VALUES(?, ?, ?, ?)`,
                                     [
                                        req.body.name,
                                        req.body.number,
                                        req.body.address,
                                        req.body.occupation
                                    ])
        conn.commit()
        conn.end()
        return res.json(que)
    }
    catch (err) {
        return res.json({"Message" : "An Error Occured"})
    }

    // pool.query(`INSERT INTO data (name, number, address, occupation) 
    //             VAlUES(?, ?, ?, ?)`,
    //             [data],
    //             (err, result) => {
    //                 if (err) return res.json({"Message": "An Error Occure"})
    //                 return res.json(result)
    //             })
})

app.listen(8081, () => {
    console.log("listening to 8081")
})


