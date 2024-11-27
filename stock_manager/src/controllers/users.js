const{request, response}=require('express');
const pool = require('../db/connection.js');
const { usersQueries } = require('../moduls/users.js');
//const users=[
//    {id: 1, name: 'Max'},
//    {id: 2, name: 'Daniel'},
//  {id: 3, name: 'Agustin'},
//];

const getAllUsers= async (req=request, res=response)=>{
  let conn;
  try{
    conn = await pool.getConnection();
    const users =await conn.query(usersQueries.getAll);
    

   // console.log({users});
    res.send(users);
  }catch(error){
    res.status(500).send(error);
    return;
  }finally{
  if (conn) conn.end();
  }
}

const getUserById = async (req=request, res=response)=>{
    const {id}=req.params;

    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
      }
    
    let conn;
    try{
        conn = await pool.getConnection();
        const user = await conn.query(usersQueries.getUserById, [+id]);
        if(!user){
            res.status(404).send('User not found');
            return;
        }
        res.send(user);
        
    }catch(error){
        res.status(500).send(error);
    }finally{
        if (conn) conn.end();
    }

 

}

// TAREA que explico el profesor en clase
// Crear un nuevo usuario
const createUser = async(req = request, res = response) => {
  const {username, password, email} = req.body;

  if (!username || !password || !email) {
      res.status(400).send('Bad request. Some fields are missinng.');
      return;
  }
  let conn;
  try{
    conn = await pool.getConnection();
    const user= await conn.query(usersQueries.getUsername,[username]);

    if(user.length >0){
      res.status(409).send('Username alredy exists');
      return;
    }
    
    const newUser = await conn.query(usersQueries.create, [username, password, email]);

    if(newUser.affectedRowns === 0){
      res.status(500).send('User could not be created');
      return;
    }

    res.status(201).send("User created succesfully");
  }catch{
    res.status(500).send(error);
    return;
  }finally{
    if(conn) conn.end();
  }

};

// Actualizar un usuario en la base de datos
const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { username } = req.body; // Asegúrate de que el campo aquí coincide con el nombre en el JSON

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  if (!username) {
    res.status(400).send('Username is required');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();

    // Verificar si el usuario existe
    const existingUser = await conn.query(usersQueries.getUserById, [id]);
    if (existingUser.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    // Actualizar el nombre de usuario
    const result = await conn.query(usersQueries.updateUserName, [username, id]);

    if (result.affectedRows === 0) {
      res.status(500).send('User could not be updated');
      return;
    }

    res.send('User updated successfully');
  } catch (error) {
    res.status(500).send(error.message || 'An error occurred');
  } finally {
    if (conn) conn.end();
  }
};

// Eliminar un usuario por ID
const deleteUser = (req = request, res = response) => {
  const {id} = req.params;

  if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
  }
  
  let conn;
  try {
    conn = await pool.getConnection()
    const user = await conn.query(userQueries.getUserById, [+id]);
    if (user.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    const deleteUser= await conn.query(usersQueries.delete, [+id]);

    if (deleteUser.affectedRowns ===) {
      res.status(500).send('User coul not be deleted');
      return;
    }

    res.send("User delete succesful");
  } catch (error ){
    res.status(500).send(error);
    return;
  }finally {
    if (conn) conn.end();
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };