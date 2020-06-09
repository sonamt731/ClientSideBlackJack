// app.js
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) => { 
	res.sendFile('index.html');
});



app.listen(3000);