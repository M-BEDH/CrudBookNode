
const express = require("express");
const app = express();

const cors = require("cors"); 
const mysql = require("mysql2");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:8081", 
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8081", 
  ],
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  headers: "Content-Type, Authorization",
  credentials: true, 
};


app.use(express.json());

app.use(cors(corsOptions));


const db = mysql.createConnection({
  host: "localhost",   
  user: "root",         
  password: '',         
  database: "crudbooknode",  
});


db.connect((err) => {
  if (err) {

    console.error('Code d\'erreur:', err.code);
    return;
  }

  console.log('Connecté à la base de données MySQL');
});


app.get("/", (req, res) => {

  const sql = "SELECT * FROM books";
  db.query(sql, (err, data) => {
    if (err) {

      return res.json("Error");
    }
  
    res.json(data);
  });
});


// -----------------------------------------------
app.get("/book/:id", (req, res) => {

  const sql = "SELECT * FROM books WHERE id = ?";

  const id = req.params.id;
  
  db.query(sql, [id], (err, data) => {
    if (err) {
      
      return res.json("Error");
    }
    if (data.length === 0) {
  
      return res.status(404).json("book not found");
    }

    res.json(data[0]);
  });
});


app.post("/create", (req, res) => {

  const sql = "INSERT INTO books (`title`, `autor`, `parution`, `cover`) VALUES (?, ? , ?, ?)";

  const values = [
    req.body.title,  
    req.body.autor,
    req.body.parution,
    req.body.cover
   
  ];
  db.query(sql, values, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data); 
  });
});

app.put("/update/:id", (req, res) => {
 
  const sql = "UPDATE books SET `title` = ?, `autor` = ?, `parution`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title, 
    req.body.autor,
    req.body.parution,
    req.body.cover
 
  ];
 
  const id = req.params.id;
  

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error :", err); 
    return res.json(data);
  });
});


// -----------------------------------------------
app.delete("/book/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM books WHERE id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data); 
  });
});


app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

