require('dotenv').config()  //??

const express = require('express');

//ejs --> templating engine--> inject html on client side 
const expressLayout =require('express-ejs-layouts');
const cookieParser=require('cookie-parser');//  middleware helps to read data of the cookie- store session when login
const mongoStore=require('connect-mongo'); //connect-mongo will serialize sessions using JSON
const session=require('express-session'); //middleware module allows to create session
const bcrypt=require('bcrypt'); //library used for password hashing
const methodOverride=require('method-override'); 





const connectDB= require('./server/config/db');  //importing mongodb connection 




const app=express();

//const PORT=5000; // || process.env.PORT --> for alag devices if uploaded on github

//connect to DB
connectDB();
app.use(express.urlencoded({ extended: true })); //to parse req. body in form of json 
app.use(express.json());  //express cant read json, server works with json, to read data, this statement is used. 
app.use(cookieParser()); // middleware helps to read cookie data

app.use(methodOverride('_method'));  //to use PUT & DELETE
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/blogg"
    }),
}));


app.use(express.static('public')); //builtin middleware func in express --> for static files like css js images 

//ejs
app.use(expressLayout);
app.set('layout', './layouts/main');

app.set('view engine', 'ejs');

//code messy na ho, that's why ye get post vale chizo ke lie we made routes.
//for this file to access those routes 
app.use('/',require('./server/routes/main'))

app.use('/',require('./server/routes/admin'))




app.listen(3000,()=>{
    console.log('http://localhost:3000');
})