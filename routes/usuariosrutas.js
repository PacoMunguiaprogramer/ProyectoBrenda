const ruta= require("express").Router(); //Contiene las rutas
const UsuarioClase= require("../clases/UsuarioClase");
const UsuarioBD= require("../bd/UsuarioBD");
const usuarioBD = new UsuarioBD();
ruta.get("/" ,async(req, res)=>{
    const usuariobd=new UsuarioBD();
    var usuarios=await usuariobd.mostrarUsuarios();
    var usuariosCorrectos=[];
    usuarios.forEach(usuario =>{
        const usuario1 = new UsuarioClase(usuario);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined  ){
            usuariosCorrectos.push(usuario1.obtenerDatos);
        }
        
    })
    //console.log(usuarios.data);
  
res.render("registro");
});


ruta.get("/agregarUsuario",(req,res)=>{
    res.render("empe");
});

ruta.get('/registro', (req, res) => {
    res.render('registro');
  });

  ruta.get('/prototipo', (req, res) => {
    res.render('prototipo');
  });

  ruta.get('/acercade', (req, res) => {
    res.render('acercade');
  });



ruta.post("/agregarUsuario",async (req,res)=>{

console.log(req.body);
const usuario1=new UsuarioClase(req.body);
const usuariobd=new UsuarioBD();
if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
    await usuariobd.nuevoUsuario(req.body);
    res.render("registro");
}
else{
    res.render("error");
}
});
ruta.get("/editarUsuario/:id", async(req, res)=>{

    const usuariobd= new UsuarioBD();
const [[usuario]]=await usuariobd.buscarUsuarioPorId(req.params.id);
console.log(usuario);
res.render("editarUsuario",usuario);
});

ruta.post("/editarUsuario", async(req, res)=>{
const usuariobd= new UsuarioBD();
const usuario1= new UsuarioClase(req.body);
if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
await usuariobd.editarUsuario(req.body);
res.redirect("/");
}
else{
res.render("error");
}
});
ruta.get("/borrarUsuario/:id", async(req,res)=>{
    const usuariobd= new UsuarioBD();
    usuariobd.borrarUsuario(req.params.id);
    res.redirect("/");
})

ruta.get('/login', (req, res) => {
    res.render('inicio-sesion');
  });
  
  ruta.post('/auth', async (req, res) => {
    const nombre = req.body.nombre;
    const contraseña = req.body.contraseña;
  
    if (nombre && contraseña) {
        const usuariobd=new UsuarioBD();
      const results = await usuarioBD.validarUsuario(nombre, contraseña);
      if (results && results.length > 0) {
        req.session.loggedin = true;
        req.session.nombre = nombre;
        res.redirect('/home');
      } else {
        res.send('Nombre o contraseña incorrectos.');
      }
    } else {
      res.send('Por favor ingrese el nombre y la contraseña.');
    }
  });
  
  ruta.get('/home', (req, res) => {
    if (req.session.loggedin) {
      res.render('inicio');
    } else {
      res.send('Por favor inicie sesión para ver esta página.');
    }
  });
module.exports=ruta;