import express from "express";
import role from "../controllers/role.js";

const router = express.Router()

//post registrar
//http://localhost:3001/api/role/registerRole
//role.registerRole es lo que se exporto del controlador
router.post("/registerRole", role.registerRole);

//lo exporta
export default router