import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: "7b8c4e2f3a9d10e6b9f4a0d2d5e8f925a3b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0", // Change this to a strong, random secret key
    resave: false,
    saveUninitialized: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#Functionalcontext@375",
  database: "StakesTest",
});

app.get("/", (req, res) => {
  res.json("[ Backend Connected ]");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// ... existing imports and setup

app.get("/getBalance", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "User not logged in" });
  }

  const userId = req.session.user.id;

  const q = "SELECT balance FROM users WHERE id = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error" });
    return res.json({ balance: data[0].balance });
  });
});

// ... rest of the code


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], async (err, data) => {
      if (err) return res.status(500).json({ message: "Internal server error" });

      if (data.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = data[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set the user as authenticated in the session
      req.session.user = user;

      res.json({ message: "Logged in successfully" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    const emailExists = await db.promise().query(checkEmailQuery, [email]);

    if (emailExists[0].length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    const insertQuery =
      "INSERT INTO users (username, email, password, balance) VALUES (?, ?, ?, ?)";
    await db.promise().query(insertQuery, [username, email, hashedPassword, 0]);

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
