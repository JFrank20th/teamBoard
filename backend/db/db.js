//importar librerias
//const moongose= require("mongoose");
import mongoose from "mongoose";

//crear funcion
const dbconnection = async() => { // asincrono=async (siempre tiene que ir asyn y await)
  try {
      // mongoose se conecta desde la variable de entorno(.env) y sacan DB_CONNECTION que es la url
    await mongoose.connect(process.env.DB_CONNECTION, { // await es una promesa para cumplir el try catch
      useNewUrlParser: true, // la convierte y no la muestre en consola, para protegerla
      useUnifiedTopology: true // Unifique la informacion que necesitamos si basura
    });
    console.log("Connection with MongoDB: Ok");
  } catch (e) {
    console.log("Error Connecting to MongoDB: \n" + e);
  }
};

//la exporta para que otros archivos la puedan usar
export default { dbconnection };