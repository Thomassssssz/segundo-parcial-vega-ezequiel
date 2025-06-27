import express from "express";
import { crearPelicula, listarTodasLasPeliculas, obtenerPelicula, actualizarPelicula, eliminaPelicula } from "../controllers/movie.controllers.js";
const rutas  = express.Router();

rutas.post("/api/movies", crearPelicula);

rutas.get("/api/movies", listarTodasLasPeliculas);

rutas.get("/api/movies/:id", obtenerPelicula);

rutas.put("/api/movies/:id", actualizarPelicula);

rutas.delete("api/movies/:id", eliminaPelicula);


export default rutas; 
