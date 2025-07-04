"use strict";
// //write a function to create users table.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Client } from "pg";
// const client = new Client({
//     connectionString:'postgresql://neondb_owner:npg_1wYBDEyCie2J@ep-bold-bread-a58ziobh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
// })
// async function createUsersTable() {
//     await client.connect()  
//     const result = await client.query(`
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
//         );
//     `) 
//     console.log("Users table created successfully", result);
// }
// createUsersTable()
//     .catch(err => console.error("Error creating users table", err))
//     .finally(() => client.end());
// import { Client } from 'pg';
// // Async function to insert data into a table
// async function insertData() {
//   const client = new Client({
//     connectionString:'postgresql://neondb_owner:npg_1wYBDEyCie2J@ep-bold-bread-a58ziobh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
//   });
//   try {
//     await client.connect(); // Ensure client connection is established
//     const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
//     const res = await client.query(insertQuery);
//     console.log('Insertion success:', res); // Output insertion result
//   } catch (err) {
//     console.error('Error during the insertion:', err);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }
// insertData();
const pg_1 = require("pg");
// Async function to fetch user data from the database given an email
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: 'postgresql://neondb_owner:npg_1wYBDEyCie2J@ep-bold-bread-a58ziobh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
        });
        try {
            yield client.connect(); // Ensure client connection is established
            const query = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log('User found:', result.rows[0]); // Output user data
                return result.rows[0]; // Return the user data
            }
            else {
                console.log('No user found with the given email.');
                return null; // Return null if no user was found
            }
        }
        catch (err) {
            console.error('Error during fetching user:', err);
            throw err; // Rethrow or handle error appropriately
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
// Example usage
getUser('user5@example.com').catch(console.error);
