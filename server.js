const PORT = 5500;
const host = `http://localhost:${PORT}/`;
let shortRandomString = require('shortid');
const path = require('path');
const dbModel = require('./database');
const mongoose = require('mongoose');
const express = require('express');

mongoose.connect("mongodb+srv://admin:admin@cluster0.pqf8w.mongodb.net/urlShortner?retryWrites=true&w=majority"); //db connection
/*Middleware */
const app = express();
app.use(express.json());
app.use(express.static('public'));

//renders the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

/* Using Of Urls */
app.get('/:code', async(req, res) => {
    const url = await dbModel.findOne({url_ID: req.params.code}); //fetch the url from db using url code.
    if(url){
        url.save();
        return res.status(200).redirect(url.LongUrl); //go to full url
    }
    return res.status(404).json('NotFound'); //throw 404 error
});

/* Takes Long Url, Saves it in db, Returns short link */
app.post('/', async(req, res) => { 
    try{
        const LongUrlExistance = await dbModel.findOne({LongUrl: req.body.url}); //finds the long url in the db
        if(!LongUrlExistance){       
            const urlShortCode = shortRandomString(req.body.url); //generates new random string
            const newURL = await dbModel.create({ 
                url_ID: urlShortCode,
                LongUrl: req.body.url,
                ShortUrl: host + urlShortCode
            });
            res.json(newURL); 
        }
        else           
            res.json(LongUrlExistance); //return the saved url in the db.          
    }catch(error){
        res.json({'ShortUrl': 'ERROR: object cannot be created'});
    }
});
 
app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));
