
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const db = new sqlite3.Database("./data.db");

app.use(bodyParser.json());
app.use(express.static("public"));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS volunteers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    interest TEXT,
    message TEXT
  )`);
});

app.post("/api/volunteer", (req,res)=>{
  const {name,email,phone,city,interest,message} = req.body;
  db.run(
    "INSERT INTO volunteers(name,email,phone,city,interest,message) VALUES(?,?,?,?,?,?)",
    [name,email,phone,city,interest,message],
    function(err){
      if(err) return res.status(500).send(err);
      res.json({success:true});
    }
  );
});

app.get("/admin/volunteers",(req,res)=>{
  db.all("SELECT * FROM volunteers",(err,rows)=>{
    if(err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.listen(3000,()=>{
  console.log("BNS website running on http://localhost:3000");
});
