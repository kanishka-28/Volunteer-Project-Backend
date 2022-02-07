const db = require("./database/connection/index");

const express = require("express");
const cors = require("cors")
const auth = require("./routes/auth")
const user = require("./routes/user")
const resume = require("./routes/resume")
const intern = require("./routes/intern")
const company = require("./routes/company")

const app = express();
app.use(express.json());
app.use(cors());
db();

app.get("/", (req,res)=>{
    res.send("hello world");
})

//api
app.use("/auth", auth);
app.use("/user", user);
app.use("/resume", resume);
app.use("/intern", intern);
app.use("/company", company);

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`app listening at port http://localhost:${port}`);
})