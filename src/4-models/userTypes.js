import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import {pool, initializeDbPool} from "./mysql_connection.js"

// only in develop time!
await initializeDbPool();
//

/**Return array of all UserTypes. */
export async function getAllUserTypes() {
    let [userTypes] = await pool.query(
        `SELECT UserTypeID, UserTypeName
         FROM UserTypes`
    )
    return userTypes;
}

/**Return object with userType info,
 * get argument userType id number.
 */
export async function getUserType(UserTypeID) {
    let [[userType]] = await pool.query(
         `SELECT UserTypeID, UserTypeName
          FROM UserTypes
          WHERE UserTypeID = ?`, [UserTypeID]
    );
    return userType;
}

/**add new userType to the database. */
export async function addUserType({UserTypeName}) {
    let isCreate = await pool.query(
        `INSERT INTO UserTypes(UserTypeName)
         VALUES(?);`, [UserTypeName]
    );
    return isCreate;
}

/**update exists userType
 * the argument is the new values as object of userType (with UserTypeID).
*/
export async function updateUserType(newUserType) {
    let oldUserType = await getUserType(newUserType.UserTypeID);
    let updateKeys = createUpdateKeys(oldUserType, newUserType);
    let updateValues = createUpdateValues(updateKeys, newUserType);
    let [isUpdate] = await pool.query(
    `UPDATE UserTypes
     SET ${updateKeys.map((key) => `${key} = ?`).join(", ")}
     WHERE UserTypeID = '${newUserType.UserTypeID}';`, updateValues
    );
    return isUpdate["info"];
}

/**delete userType perematly, the argument is userType number. */
export async function delelteUserType(UserTypeID) {
    let isDeleted = await pool.query(
        `DELETE FROM UserTypes 
         WHERE UserTypeID = ?`, [UserTypeID] 
    );
    return isDeleted;
}

async function test() {
   let usertype = {
    'UserTypeName': 'manager'
   }
   let usertype2 = {
     'UserTypeID': 2,
    'UserTypeName': 'designer'
   }
    // let res = await addUserType(usertype);
    // let res = await getAllUserTypes();
    // let res = await getUserType(2);
    // let res = await updateUserType(usertype2);
    let res = await delelteUserType(3);

    console.log(res);
}
test();