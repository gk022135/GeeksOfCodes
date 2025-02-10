const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");



const DB_connect = require('./Configs/DatabaseConfig')

const route = require('./Routes/PostRoutes')


const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/mern-revision/v1',route);


app.get('/hello', (req, res) => {
    console.log("hi all fine bro");
    res.send(`<h1> hi bro </h1>`);
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});

const URL = process.env.MONGO_URL;
console.log("hi",URL)

//url ko argument mein pass kiya
DB_connect(URL);  // db ko call kiye taki db connect function run ho