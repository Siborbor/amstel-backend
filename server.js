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
    host:process.env.DB_HOST || "localhost",
    port:process.env.DB_PORT ||3306,
    user:process.env.DB_USER ||'root',
    password:process.env.DB_PASSWORD ||"",
    database:process.env.DB_NAME ||'amstel'
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