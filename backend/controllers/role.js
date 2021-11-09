import { response } from "express";
import role from "../models/role.js";

//aqui necesita recibir y responder informacion req, res
const registerRole = async (req, res) => {
  //validar que los datos no esten vacios
  //estos dos datos van a llegar name y description
  // ! significa false de lo contrario es true
  // cuando solo hay un if no se necesitan las llaves {}
  if (!req.body.name || !req.body.description)
    //estatus 400 es cuando hay un error
    // retorna este mensaje
    return res.status(400).send("Incomplete data");

  //validar que no exista un role-> findOne es el primero que exista
  //va a revisar name
  // con await para esperar respuesta del procesos
  //role.findone = el primero que encuentre
  const existingRole = await role.findOne({ name: req.body.name });
  if (existingRole) return res.status(400).send("The role already existing");

  //estructura del esquema
  const roleSchema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatuus: true,
  });
  //confirma que todo lo anterior ya esta
  // await esperar a que haga el proceso
  const result = await roleSchema.save();
  //validar si si se guardo en mongo
  if (!result) res.status(400).send("Failed to register role");

  //muestra el json
  return res.status(200).send({ result });
};

//consultar roles
const listRole = async (req, res) => {
  //role.find = trae todo
  const roleSchema = await role.find();
  // este if primero se ejecuta el else
  if (!roleSchema || roleSchema.length == 0)
    //los mensajes de errros se pueden enviar como JSON ({ Error:"Empty role list"})
    return response.status(400).send({ Error: "Empty role list" });
  return res.status(200).send({ roleSchema });
  //operador ternario es igual al if anterior
  // return !roleSchema || roleSchema.length == 0 ? response.status(400).send("Empty role list") : res.status(200).send({ roleSchema });
};

//editar por id
const updateRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  //deja editar si uno cambia y el otro no (la , haria como un Y)
  const existingRole = await role.findOne({
    name: req.body.name,
    description: req.body.description,
  });
  if (existingRole) return res.status(400).send("The role already existing");

  const roleUpdate = await role.findByIdAndUpdate(req.body._id, {
    //aqui pone los nuevos datos
    name: req.body.name,
    description: req.body.description,
  });
  return !roleUpdate
    ? res.status(400).send("Error editing role")
    : res.status(200).send({ roleUpdate });
};

//eliminar role
const deleteRole = async (req, res) => {
  const roleDelete = await role.findByIdAndDelete({ _id: req.params["_id"] });
  return !roleDelete
    ? res.status(400).send("Role no found")
    : res.status(200).send("Role deleted");
};

//Bucar por id (Cuando se hace login para saber que role tiene el usuario)
//parametros para buscar internamente
//login JWT{7037815ca481f}
const findRole = async (req, res) => {
  const roleId = await role.findById({ _id: req.params["_id"] });
  return !roleId
    ? res.status(400).send("No search results")
    : res.status(200).send({ roleId });
};
//exportar todas las funciones
export default { registerRole, listRole, updateRole, deleteRole, findRole };
