const express = require("express");
const app = express();

app.use(express.json()); // for reading request from body
const cors = require("cors"); //middleware for react
app.use(cors());

const { addUser, selectUser, login } = require("./user");
let isLoggedin = false;

// fetch data
app.get("/userlist", async (req, res) => {
  //   res.json("kuchh bhi");
  const list = await selectUser();
  res.json(list);
});

app.post("/login", async (req, res) => {
  const user = req.body;
  //   console.log(user);
  const list = await login(user);
  console.log(list);
  if (list.length != 0) isLoggedin = true;
  res.json(list);
});

app.post("/signout", (req, res) => {
  isLoggedin = false;
});

//post data
app.post("/newUser", async (req, res) => {
  const user = req.body;
  //   console.log(user);
  await addUser(user);
  res.json("record added");
});

app.get("/loginstate", (req, res) => {
  res.json(isLoggedin);
});

app.listen(4000, () => console.log("Server Started"));
