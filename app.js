// server/index.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const fs = require("fs");
var bodyParser = require('body-parser');
var cors = require('cors')

var corsOptions = {
    origin: 'https://autocuidado.netlify.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

app.use(bodyParser.json());

app.post('/llista', (req, res, next) => {

    console.log("req.body ", req.body)
    let text = req.body?.item ? req.body?.item + ';' : 'no hay naaaa';

    console.log("text ", text);

    fs.appendFile('llista.txt', text, (err) => {
        if (err) {
            console.error('Error al añadir el texto:', err);
            res.json("error!");
        } else {
            console.log('Texto añadido exitosamente');
            res.json("ok!");
        }
    });
});

app.get('/llista', (req, res) => {
    fs.readFile('llista.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al añadir el texto:', err);
        } else {
            //console.log(data)
            let objData = data.split(";");
            objData.pop();
            res.json({data: objData});
        }
    });
});


app.listen(PORT, () => {
    console.log(`Hola!!!! Servidor escuchando en http://localhost:${PORT}`);
});