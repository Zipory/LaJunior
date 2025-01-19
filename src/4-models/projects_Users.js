import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import { initializeDbPool, pool } from "./mysql_connection.js";

// only in develop time!
await initializeDbPool();
//






/**add new project to the database,
 * the first argument is object of the new project,
 * the second is object of the user that create the project.
 */
export async function addProject({UserID, ProjectID, UserTypeID}) { 
    let [isCreated] = await pool.query(
        `INSERT INTO Projects(ProjectName, Description, ProjectOwner)
         VALUES(?, ?, ?);`, [ProjectName, Description, UserID]
    );
    return isCreated["affectedRows"];
}