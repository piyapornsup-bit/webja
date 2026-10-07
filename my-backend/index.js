// index.js
const express = require("express");
const app = express();
const cors = require("cors")
const PORT = 3000;
const db = require("./db");
app.use(cors());


app.get("/", (req, res) => {
    res.send("สวัสดีค่ะ Server ทำงานแล้ว!");
});

app.listen(PORT, () => {
    console.log(`Server กำลังทำงานที่ http://localhost:${PORT}`);
});

app.get("/api/books",async (req, res)=> {
    try {
        const [rows] = await db.query("SELECT * FROM books");
        res.json(rows);
    }catch (err){
        res.status(500).json({ error: err.message});
    }
})