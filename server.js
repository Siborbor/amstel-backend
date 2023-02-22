const express = require('express');
const mysql = require('mysql2');
const myconn = require('express-myconnection');
var cors = require('cors')

const routes = require('./routes')

const app = express();
//set el puerto de escucha
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use(cors())
app.set('port', process.env.PORT || 9000);

const dbOptions = {
    host:"containers-us-west-141.railway.app",
    port:6360,
    user:'root',
    password:"ZKmfreSSTTbQ968FjpI4",
    database:'railway'
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