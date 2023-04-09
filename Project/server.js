const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const PORT = 3000;
const HOST = '0.0.0.0';

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "OnlineStore_Data",
  password: "Think@95",
  port: 5432,
});


app.use(express.static("OnlineStore"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  next();
})

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong!')
})


app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "OnlineStore/index.html"));

  res.setHeader('Location', '/');
  res.status(302).end();
});


app.get("/signup", (_req, res) => {
  res.sendFile(path.join(__dirname, "OnlineStore/page_createaccount/Page-CreateAccount.html"));
});

app.get("/login", (_req, res) => {
  res.sendFile(path.join(__dirname, "OnlineStore/page_login/Page-Login.html"));
});

// app.get("/cart", (_req, res) => {
//   res.sendFile(path.join(__dirname, "website/cart/index.html"));
// });

app.post("/checkLogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(username)
    console.log(password)
    // const userExists = await pool.query(
    //   "SELECT * FROM public.users WHERE name = $1",
    //   [name]
    // );
    // if (userExists.rowCount > 0) {
    //   res.status(400).send("User already exists!");
    // } else {
      const result = await pool.query(
        "SELECT * FROM public.users WHERE name = $1 AND password = $2",
        [username, password]
      );
      if (result.rowCount > 0) {
          res.json({found: true})
        } else {
          res.json({found: false})
        }
      console.log(result.rowCount);
    // }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error!");
  }

  // res.redirect("/");
});

app.post("/checkSignup", async (req, res) => {
  const { name_create, password_create } = req.body;
  try {
    const userCreate = await pool.query(
      "SELECT * FROM public.users WHERE name = $1 AND password = $2",
      [name_create, password_create]
    );
    if (userCreate.rowCount > 0) {
      res.json({found: true});
    } else {
      const userFound = await pool.query(
        "INSERT INTO public.users (name, password) VALUES ($1, $2) RETURNING *",
        [name_create, password_create]
      );
      res.json({found: false})
      console.log(userFound.rowCount)
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error!");
  }

  // res.redirect("/");
});

// app.post("/login", async (req, res) => {
//   const { email, name } = req.body;
//   try {
//     const result = await pool.query(
//       "SELECT * FROM users WHERE email = $1 AND name=$2",
//       [email, name]
//     );
//     if (result.rowCount > 0) {
//       res.send('User with this email already exists!')
//     }
//     console.log(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//   }

//   res.redirect("/");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});