import movies from "../models/movie.model.js"; 


export const crearPelicula = async (req, res) => {
    
    const { title, director, duration, genre, description } = req.body;


    try {
        // ==========Vali de todos los campos obligatorios==========

        if (title == undefined) return res.status(400).json
        ({ Message: "El titulo de la pelicula no puede estar vacio." });
    

        if (director == undefined) return res.status(400).json
        ({ Message: "El nombre del director no puede estar vacio." });


        if (duration == undefined) return res.status(400).json
        ({ Message: "La duración no puede estar vacio." });


        if (genre == undefined) return res.status(400).json
        ({ Message: "El género de la pelicula no puede estar vacio." });



        // ========== Vali de duración de la película para que sea un numerito entero positivo ==========
        const duracionEntero = Math.floor(duration); 
        if (duration != duracionEntero) return res.status(400).json
        ({ Message: "La duración de la pelicula debe ser un número entero positivo." });


        //========== Vali de nombre único de la pelicula=============
        const titleUnico = await movies.findOne({ where: { title } });
        if (titleUnico != null) return res.status(400).json
        ({ Message: "El nombre de la pelicula ya es existente." });


            const title = await movies.create({ title, director, duration, genre, description });
            res.status(201).json
            ({ Message: "Se creo la nueva película ", movies });


    } catch (error) {
                console.error("Error al crear la película:", error); 
        res.status(500).json({ message: error.message });
    }
};

export const actualizarPelicula = async (req, res) => {
    const { title, director, duration, genre, description } = req.body;
        const { id } = req.params;


    try {
        // ======Vali de Película unica para la actualización======
               const titleUnico = await movies.findOne({ where: {title } });
               if (titleUnico && titleUnico.id != id) {
            return res.status(400).json
            ({ Message: "EL nombre de la pelicula ya es existente" });
        }

        const [updated] = await movies.update(
            { title, director, duration, genre, description }, 
            { where: { id: id } }                     
        );

               if (updated === 0) return res.status(404).json
               ({ Message: "La película no existe" });

                return res.status(200).json
                ({ Message: "Se actualizo el nombre de la pelicula" });

    } catch (error) {
              console.error("Error al actualizar la pelicula:", error);
        res.status(500).json
        ({ Message: error.message });
    }
};

export const listarTodasLasPeliculas = async (req, res) => {
    try {
        const title = await movies.findAll(); 

               if (!title || title.length === 0) {
            return res.json
            ({ Message: "No hay resultados en la base de datos." });
        }

              return res.status(200).json(title);
    } catch (error) {
               console.error("Error al listar todas las peliculas:", error);
        res.status(500).json
        ({ message: error.message });
    }
};


export const obtenerPelicula= async (req, res) => {
    const { id } = req.params;

    try {
        const datos = await movies.findByPk(id); 

                if (title) return res.status(200).json(title);

                return res.status(404).json
                ({ Message: "La pelicula no existe" });
    } catch (error) {
             console.error("Error al obtener las peliculas por ID:", error);
        res.status(500).json
        ({ message: error.message });
    }
};

export const eliminaPelicula = async (req, res) => {
    const { id } = req.params; 

    try {
        const deleted = await movies.destroy({ where: { id: id } }); 

               if (deleted === 0) return res.status(404).json
               ({ Message: "No se encontro la pelicula" });

               res.status(204).send();

    } catch (error) {
               console.error("Error al eliminar la pelicula:", error);
        res.status(500).json
        ({ message: error.message });
    }
};