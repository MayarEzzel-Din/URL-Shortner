const PORT = 5500;
const host = `http://localhost:${PORT}/`;
let shortRandomString = require('shortid');
const path = require('path');
const mongoose = require('./database');
const express = require('express');
const dbModel = mongoose();

/*Middleware */
const app = express();
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/:code', async(req, res) => {
    const url = await dbModel.findOne({url_ID: req.params.code}); //fetch the url from db
    if(url !== null){
        url.save();
        return res.status(200).redirect(url.LongUrl); //go to full url
    }
    return res.status(404).json('NotFound'); //throw 404 error
});

app.post('/', async(req, res) => { 
    const shortenedUrl = shortRandomString(req.body.url);
    const Url_Instance = new db({
        url_ID: shortenedUrl,
        LongUrl: req.body.url,
        ShortUrl: host + shortenedUrl
    });

    let url = await db.findOne({LongUrl:req.body.url});
    if(!url){
        Url_Instance.save().then(console.log('saved'));
        res.json({ 'shortened-url': `${host}${shortenedUrl}`});
    }
    else{
        res.json({'shortened-url': shortenedUrl});
    }
    
});
 
app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));
