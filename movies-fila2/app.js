import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './src/routes/movie.routes.js';
import { startDB } from  './src/config/database.js';


dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); 
app.use("/api", movieRoutes);


app.use((req, res)=>{
  res.status(404).json({errorMessage: "Direccion not HostNotFoundError."});
});

startDB().then(()=>{
    console.log("Servidor prendido: ");
  })

  app.listen(PORT, async () => {
  console.log(`Servidor corriendoo en elpuerto ${PORT}`);
  await startDB(); 
});