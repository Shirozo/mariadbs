import express from "express"
import mariadb from 'mariadb'
import cors from 'cors'

//MariaDB Connection
const pool = mariadb.createPool({
    host: 'mariadb_host',
    user: 'mariadb_user',
    port: "port_to_listeb",
    password: 'host_password',
    database: 'mariadb_database'
})

//app for routing the API
const app = express()

//don't know what this is
app.use(cors())

//allow json return
app.use(express.json())

app.get("/", async (req, res) => {
    /* 
    API para hit pag kuhi tanan nga data didto hit datbase
    */
    try {
        //Get connection to database
        const conn = await pool.getConnection()
        //query to database
        const result = await conn.query("SELECT * FROM data ORDER BY name")
        //terminate connection
        conn.end()
        //return an result as an object gamit it res.json
        return res.json(result)
    }
    catch (err) {
        //catch it error ngin mayda error hit database ngan return it nga message
        return res.json({"Message" : err})
    }
        
})  

app.post("/addcontact", async (req, res) => {
    /* 
    API para mag add hin data ngadto hit database 
    */
    try {
        //Get connection to database
        const conn = await pool.getConnection()
        //Gamita it 'INSERT' query para maka'add ka hin data hit database
        const que = await conn.query(`INSERT INTO data (name, number, address, occupation)
                                     VALUES(?, ?, ?, ?)`,
                                     [
                                        req.body.name,
                                        req.body.number,
                                        req.body.address,
                                        req.body.occupation
                                    ])
        //ig commit it query para magka-may'ada changes ha database. Kun dire ig commit, no changes hit db
        conn.commit()
        //end connection
        conn.end()
        //return result dadama as an object
        return res.json(que)
    }
    catch (err) {
        //kun may error return it nga error
        return res.json({"Message" : err})
    }
})

app.delete("/removecontact/:id", async(req, res) => {
    /* 
    API para magtanggal hin data ha database
    */
    try {
        //Make connection dadama
        const conn = await pool.getConnection()
        //Query ngadto ha database specifying kun ano it id taat ireremove kay it id is Unique
        const que = await conn.query("DELETE FROM data WHERE id = ?", [req.params.id])
        //Commit to make a changes in database
        conn.commit()
        //terminate connection dadama
        conn.end()
        //return dadama as an object
        return res.json(que)
    }
    catch (err) {
        //kun may error return it nga error
        return res.json({"Message" : err})
    }
})

app.get("/user/:id", async(req, res) => {
    /* 
    API pagfetch data gamit it ira ID
    */
    try {
        //Get connection
        const conn = await pool.getConnection()
        //Query to databse using 'SELECT' para hit pag retreive specifying it iya id
        const que = await conn.query("SELECT * FROM data WHERE id = ?",  [req.params.id])
        //terminate connection
        conn.end()
        //i-return an result as an object
        return res.json(que)
    }
    catch (err) {
        //kun may error return it nga error
        return res.json({"Message" : "Can't retreived data"})
    }
})

app.post("/update", async(req, res) => {
    /* 
    API pag update hin data ha database
    */
    try {
        //get connection 
        const conn = await pool.getConnection()
        //Query ha database using 'UPDATE' tas 'SET' para balyuon it mga data
        const query = await conn.query("UPDATE data SET name=?, number=?, address=?, occupation=? WHERE id = ?",
                                [
                                    req.body.name,
                                    req.body.number,
                                    req.body.address,
                                    req.body.occupation,
                                    req.body.id
                                ])
        //commit the changes
        conn.commit()
        //terminate connection
        conn.end() 
        //return dadama an result as an object
        return res.json(query)
    }
    catch (err) {
        //kun may error return it nga error
        return res.json({"Message" : "Database Error"})
    }
})

/*
Para mag start hin localhosting hit database
It nga 8081 is port it hiya. Meaning kun makadto ka http://localhost:8081/, magfefetch hiya hin data
kay it route nga "/" is to fetch a data.
Puyde it nim balyuan nga route
*/
app.listen(8081, () => {
    console.log("listening to 8081")
})


