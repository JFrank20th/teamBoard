import express from "express";
import role from "../controllers/role.js";

const router = express.Router();

//post registrar
//role.registerRole es lo que se exporto del controlador
//http://localhost:3001/api/role/registerRole
router.post("/registerRole", role.registerRole);
//http://localhost:3001/api/role/listRole
router.get("/listRole", role.listRole);
//http://localhost:3001/api/role/findRole/617c6d7d4717037815ca481f   -->  el id del role
router.get("/findRole/:_id",role.findRole);// significa que va a venir un parametro id
//http://localhost:3001/api/role/updateRole
router.put("/updateRole",role.updateRole);
//http://localhost:3001/api/role/deleteRole/617c6d7d4717037815ca481f   -->  el id del role
router.delete("/deleteRole/:_id",role.deleteRole);

//lo exporta
export default router;
