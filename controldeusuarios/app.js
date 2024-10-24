const express = require("express");

const app = express();
app.use(express.json());

const usuarios = [
    {
        id: 1,
        nombre: "Evelin",
        apellido:"Montalvo",
        email:"evelinmontalvomtz.ad@gmail.com",
    },
    {
        id: 2,
        nombre: "Zuriel",
        apellido:"Nava",
        email:"zurielnavahernandez.ad@gmail.com",
    },
]

app.get("/usuarios", (req, res) =>{
    res.status(200).send(usuarios);
})

app.get("/usuarios/:id", (req, res) => {
    const {id} = req.params;

    if(isNaN(id)){
        res.status(400).send({error:"El id debe ser un número"});
        return;
    };

    const usuario = usuarios .find((usuario) => usuario.id === +id);

    if (usuario === undefined){
        res.status(404).send({error: El usuario con id ${id} no existe});
        return;
};
    res.status(200).send(usuario);
});

/*app.post ("/usuarios", (req, res) => { 
    const{nombre, apellido, email} = req.body;

    
    validaciones
    -la informacion debe estar completa
    nombre, apellido y correo. sino viene hay que devolver un error 400
    -el email dede ser unico  400
    

    usuarios.push({id: usuarios.length+ 1, nombre, apellido, email});
    res.status(201).send("El usuario se agrego correctamente");
});*/

app.post("/usuarios", (req, res) => {
    const { nombre, apellido, email } = req.body;

    if(!nombre || !apellido || !email){
        res.status(400).send({error: "Todos los campos son requeridos"});
        return;
    }

    if(usuarios.find((usuario) => usuario.email === email)){
        res.status(400).send({error: "El email ya existe"});
        return;
    }



    // Validar que el nombre esté presente
    /*if (!nombre) {
        return res.status(400).send("El campo 'nombre' es obligatorio.");
    }

    // Validar que el apellido esté presente
    if (!apellido) {
        return res.status(400).send("El campo 'apellido' es obligatorio.");
    }

    // Validar que el email esté presente
    if (!email) {
        return res.status(400).send("El campo 'email' es obligatorio.");
    }

    // Validar que el email sea único
    const emailExiste = usuarios.some(usuario => usuario.email === email);
    if (emailExiste) {
        return res.status(400).send("El correo ya está registrado.");
    }

    // Si todas las validaciones pasan, agregar el usuario
    usuarios.push({ id: usuarios.length + 1, nombre, apellido, email });
    res.status(200).send("El usuario se agregó correctamente.");
});*/


usuarios.push({iide: usuarios.length + 1, nombre, apellido, email});

res.status(201).send("El usuario se agregó correctamente");
});


app.put("/usuarios/:id", (req, res) => {
    const { nombre, apellido, email } = req.body;

    const id = +req.params.id;
//Debemos validar que no se repita el correo, pero debemos descartar el caso de que el correo 
//de ese usuario en particular no se actualice
//que permite que actualice el correo siempre y cuando que no existe en otro usurio
    if(!nombre || !apellido || !email){
        res.status(400).send({error: "Todos los campos son requeridos"});
        return;
    }

    if(isNaN(id)){
        res.status(400).send({error:"El id debe ser un número"});
        return;
    };

    const usuario = usuarios .find((usuario) => usuario.id === +id);

    if (usuario === undefined){
        res.status(404).send({error: El usuario con id ${id} no existe});
        return;
};

    //Recorre nuestro arreglo
usuarios.forEach((usuario) => {
    if(usuario.id === id){
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;
    }
})

res.status(200).send("El usuarui se actualizó correctamente");
});


app.patch("/usuarios/:id", (req, res) => {

})

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});