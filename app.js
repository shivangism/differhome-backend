require('dotenv').config()
const express = require('express');
const app = express();

const PORT = 5000;
var projectsCtrl = require('./controllers/projectController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var loginRoute = require('./routes/loginRoute')
app.use('/',loginRoute);


app.get('/filter1',projectsCtrl.filter1)
app.get('/filter2',projectsCtrl.filter2)
app.get('/page3',projectsCtrl.page3)

app.listen(PORT,()=>{
    console.log('app is listning on port'+5000);
})