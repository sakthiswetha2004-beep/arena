const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT password FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "DB error" });
    }

    if (result.length === 0) {
      return res.json({ message: "login failed" });
    }

    const dbpassword = result[0].password;

    if (dbpassword === password) {
      res.json({ message: "login successful" });
    } else {
      res.json({ message: "login failed" });
    }
  });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});