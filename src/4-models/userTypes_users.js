import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import {pool, initializeDbPool} from "./mysql_connection.js"

// only in develop time!
await initializeDbPool();
//



/**add new UserTypes_Users to the database. */
export async function addUserType_User(UserID, UserTypeID, UserLevel) {
    let isCreate = await pool.query(
        `INSERT INTO UserTypes_Users(UserTypeID, UserID, UserLevel)
         VALUES(?, ?, ?);`, [UserTypeID, UserID, UserLevel]
    );
    return isCreate;
}


async function test() {
    let res = addUserType_User(2, 3, 1);
}