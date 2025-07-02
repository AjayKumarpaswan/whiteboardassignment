require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();



app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Successfully connected to the server");
})



const port=process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});