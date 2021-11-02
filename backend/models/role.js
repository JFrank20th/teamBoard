import mongoose from "mongoose"; // controla y administra todo lo de mongodb

// const por que nadie lo puede cambiar
const roleSchema = new mongoose.Schema(
  // esta es la estructura de un json
  {
    // asi se usa tambien // name : {type:String}
    // se abrevia asi para datos primitivos
    name: String,
    description: String,
    registerDate: { type: Date, default: Date.now }, // no es primitivo
    dbStatus: Boolean,
  }
);

//ir a mongo crear coleccion llamado "role", con roleSchema
const role = mongoose.model("roles", roleSchema);

//
export default role;
