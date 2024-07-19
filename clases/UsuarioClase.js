class Usuario{
    constructor(usuario){
       this.id=usuario.idusuarios;
       this.contraseña=usuario.contraseña;
       this.nombre=usuario.nombre,
       this.celular=usuario.celular,
       this.correo=usuario.correo,
       this.rol = usuario.rol || 'user';
    }   
    set id(id){
       this._id=id;
    }
    set nombre(nombre){
       var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
   if(regexNombre.test(nombre)){
       this._nombre=nombre;
   }
       
    }
    set celular(celular){
      
   var regexCelular = /^\d{10}$/;
   if(regexCelular.test(celular)){
       this._celular=celular;
   }
      
    }
   
   set correo(correo){
       var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       if(regexCorreo.test(correo)){
           this._correo=correo;
       }
       
   }
   set contraseña(contraseña){
    this._contraseña=contraseña;
   }
   
   get id(){
       return this._id
   }
   get nombre(){
       return this._nombre;
   }
   get contraseña(){
    return this._contraseña;
   }
   get celular(){
       return this._celular;
   }
   get usuario(){
       return this._usuario;
   }
   get correo(){
       return this._correo;
   }
   set rol(rol) {
    this._rol = rol;
}

get rol() {
    return this._rol;
}
   get obtenerDatos(){
       return{
       idusuarios:this.id ,
       nombre:this.nombre,
       contraseña:this.contraseña,
       celular:this.celular,
       correo:this.correo,
       rol: this.rol
   }
   }
   }
   module.exports=Usuario;
   