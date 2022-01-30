const db = require("./database/connection/index");

const express = require("express");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());
db();

app.get("/", (req,res)=>{
    res.send("hello world");
})

//api
app.use("/auth", require("./routes/auth/index"));
app.use("/user", require("./routes/user/index"));
app.use("/resume", require("./routes/resume/index"));
app.use("/intern", require("./routes/intern/index"));
app.use("/company", require("./routes/company/index"));

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`app listening at port http://localhost:${port}`);
})