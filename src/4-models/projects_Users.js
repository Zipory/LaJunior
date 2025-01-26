import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import { initializeDbPool, pool } from "./mysql_connection.js";

// only in develop time!
await initializeDbPool();
//




/**Return object with project_User info,
 * get argument project_User-id number.
 */
export async function getProject_User(Projects_UsersID) {
    let [[project_User]] = await pool.query(
         `SELECT Projects_UsersID, UserID, ProjectID, UserTypeID
          FROM Projects_Users
          WHERE Projects_UsersID = ?`, [Projects_UsersID]
    );
    return project_User;
};

/**add new project_User to the database,
 * the argument is object of the new project_User connection.
 */
export async function addProject_User({UserID, ProjectID, UserTypeID}) { 
    let [isCreated] = await pool.query(
        `INSERT INTO Projects_Users(UserID, ProjectID, UserTypeID)
         VALUES(?, ?, ?);`, [UserID, ProjectID, UserTypeID]
    );
    return isCreated["affectedRows"];
};

async function test() {
    let project_User = {
        UserID : 1, 
        ProjectID : 3, 
        UserTypeID : 2
    }
    let res = await addProject_User(project_User);
    console.log(res);
}
test();