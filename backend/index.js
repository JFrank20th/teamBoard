//se crea el servidor express y node

import express from "express"; //servidor
import cors from "cors"; // reglas de coneccion de todo lo que llegue al backend(si angular react o vaujs entra)
import db from "./db/db.js"; // importar db.js ruta .js se pone manual
import dotenv from "dotenv"; // variables de entorno
import role from "./routes/role.js" // la ruta
dotenv.config(); //ejecuta todas las configuraciones que estan en node_modules  .env

const app = express(); //crear el servidor de express

app.use(express.json()); // solo se usa con JSON
app.use(cors());// Con esta se entienda
app.use("/api/role", role) //asi se va a usar

app.listen(process.env.PORT, () =>
  console.log("Backend server Running on port: " + process.env.PORT)
); // puerto para que express ejecute el servidor esta en .env PORT y muestra un mensaje exitoso

db.dbconnection();
