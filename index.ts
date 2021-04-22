import { getAllProductInformation } from "./Services/ProductService";

const express = require('express');
const cors = require('cors');
const app = express();
const environment = process.env;

if (!environment.HOST || !environment.PORT) {
    throw new Error("Error : Host and/or port need to be specified");
}

const host = environment.HOST;
const port = environment.PORT;
const protocol = environment.PROTOCOL || 'http';

if (protocol === 'https') {
    //TODO ssl and https managing
} 

app.use(cors());

/*
*  Get all sources informations route
* */
app.get('/products/', (req, res) => {
    getAllProductInformation().then(value => {
        res.send(value);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
})

app.listen(port, () => {
    console.log(`[Info] API Started on ${protocol}://${host}:${port}`);
})