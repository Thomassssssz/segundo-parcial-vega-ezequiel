import { DataTypes } from "sequelize";
import  sequelize  from "../config/database.js";

const movies = sequelize.define("movies",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    director:{
        type: DataTypes.STRING,
        allowNull: false
    },
    duration:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING		
    },
});

export default movies; 




