const express = require('express');

const app = express();

app.use(express.json());

const usuarios= [
    {
    id: 1,
    nombre: "Evelin",
    apellido: "Montalvo",
    email: "evelinmontalvomtz@gmail.com",
    },
    {
        id: 2,
        nombre: "Ana",
        apellido: "perez",
        email: "ana@gmail.com",    
    },
];

app.get("/usuarios",(req, res) => {
    res.status(200).send({usuarios});
});

app.get("/usuarios/:id", (req,res)=>{
    const {id} = req.params;

   if (isNaN(id)){
    res.status(400).send({error: "El id debe ser un numero"});
        return;
   };

  const usuario = usuarios.find((usuario) => usuario.id == id);

  if(usuario === undefine){
    res.status(404).send({error: `Usuario con id ${id} no existe`});
    return;
  };

    res.status(200).send(usuario);
} ); //End point 

app.post("/usuarios", (req, res) =>{
   const {nombre, apellido, email} = req.body;

/*

 Validaciones

   -La informacion debe de estar completa (nombre, apellido, email)(400)
   -El email debe ser unico (400)

*/


   usuarios.push({nombre, apellido, email});

res.send("Hola desde POST");
});

app.listen(3000,()=> {

    console.log("Servidor corriendo en http://localhost:3000");

}); 