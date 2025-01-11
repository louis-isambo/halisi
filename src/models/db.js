const { Sequelize } = require('sequelize');
require('dotenv').config();


// Option 2: Passing parameters separately (sqlite)

const DB  = (function(){

    if(process.env.run == "dev"){
     return new Sequelize({
        dialect: 'sqlite',
        storage: '.db.sqlite'
      });
    }
    if(process.env.run == "production"){
      
      return  new Sequelize(
        process.env.DB_NAME,     // Nom de la base de données
        process.env.DB_USER,     // Utilisateur de la base de données
        process.env.DB_PASSWORD, // Mot de passe
        {
          host: process.env.DB_HOST,  // Hôte
          port: process.env.DB_PORT,  // Port
          dialect: 'postgres',        // Type de base de données
          logging: false,             // Désactiver les logs en production
        }
    );
    }
})()


async function testConnection(){
    try {
        await DB.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

testConnection()
module.exports.DB = DB