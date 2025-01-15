import mysql from "mysql2/promise"
// import dotenv from "dotenv"

// dotenv.config();
import appConfig from "../2-utils/app-config.js"


// Database configuration
const dbConfig = {
    host: appConfig.host,
    user: appConfig.username,
    port: appConfig.databasePort,
    password: appConfig.password,
    database: appConfig.database,
};

// Function to create a connection pool
let pool;
const initializeDbPool = async () => {
    try {
        pool = await mysql.createPool(dbConfig);
        
        console.log('Database connection pool created successfully');
        
    } catch (error) {
        console.error('Error creating database connection pool:', error.message);
    }
};


export {pool, initializeDbPool}
