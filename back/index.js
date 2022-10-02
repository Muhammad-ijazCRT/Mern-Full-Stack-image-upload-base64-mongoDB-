const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose');

// body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


// mongo connection
mongoose.connect("mongodb://localhost/new_img", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));

const img_model = require('./model/get_image')


app.get('/', async(req, res) => {
    const data = await img_model.find();
    res.send(data)
})



app.post('/image', (req, res) => {
    const data = new img_model(req.body)
    console.log(`data from form`, data);

    data.save()

    res.send('data saved...')

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})