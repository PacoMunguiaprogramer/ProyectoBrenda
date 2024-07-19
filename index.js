const express=require("express");
const path= require("path");
const bodyParser=require('body-parser');
const session = require('express-session'); 
const usuariosRutas= require("./routes/usuariosrutas");
const app= express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use("/web", express.static(path.join(__dirname,"/web")) );
app.use(express.urlencoded({extended: true}));//permite recibir datos del formulario
app.use("/",usuariosRutas);

const port=process.env.PORT || 3000;
app.listen(port,()=>{
console.log("Sitio en http://localhost:"+port);
});