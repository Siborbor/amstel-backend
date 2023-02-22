const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
var cors = require('cors')

const routes = require('./routes')

const app = express();
//set el puerto de escucha
app.use(cors())
app.set('port', process.env.PORT || 9000);

const dbOptions = {
    host:"localhost",
    port:3306,
    user:'root',
    password:"",
    database:'amstel'
}

//middlewares-----
app.use(myconn(mysql,dbOptions, 'single'))
app.use(express.json());

//agregamos la ruta principal de nuestra api
//router-----------------------------
app.get('/',(req,res)=>{
    res.send('welcome to my api');
})

app.use('/api',routes);

//escucha el servidor
//server running--------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port:', app.get('port') );
});