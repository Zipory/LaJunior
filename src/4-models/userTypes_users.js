import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import {pool, initializeDbPool} from "./mysql_connection.js"

// only in develop time!
await initializeDbPool();
//

/**Return array of all user-types per user-id,
 * get argument user-id number.
 */
export async function getAllUserTypesPerUserID(UserID) {
    let [userType] = await pool.query(
         `SELECT usertypes.UserTypeID, UserTypeName, UserLevel
		  FROM UserTypes_Users
          JOIN usertypes 
          ON UserTypes_Users.UserTypeID = usertypes.UserTypeID
		  WHERE UserID = ?;`, [UserID]
    );
    return userType;
}

/**Return array of all users per userType-id,
 * get argument userType-id number.
 */
export async function getAllUsersPerUserTypeID(UserTypeID) {
    let [users] = await pool.query(
         `SELECT users.UserID, UserName, UserLevel
          FROM UserTypes_Users
          JOIN users
          ON usertypes_users.UserID = users.UserID
          WHERE UserTypeID = ?;`, [UserTypeID]
    );
    return users;
}

/**Return object with UserTypes_Users info,
 * get argument UserTypes_Users-id number.
 */
export async function getUserTypes_Users(UserTypes_UsersID) {
    let [[user]] = await pool.query(
         `SELECT UserTypes_UsersID, UserTypeID, UserID, UserLevel
          FROM UserTypes_Users
          WHERE UserTypes_UsersID = ?`, [UserTypes_UsersID]
    );
    return user;
}

/**Return the userTypeLevel number,
 * get arguments of user-id and userType-id numbers.
 */
export async function getUserTypeLevel(UserID, UserTypeID) {
    let [[userTypeLevel]] = await pool.query(
         `SELECT UserLevel
          FROM UserTypes_Users
          WHERE UserTypeID = ? AND UserID = ?;`, [UserTypeID, UserID]
    );
    return userTypeLevel;
}


/**add new UserTypes_Users to the database,
 * get argument UserTypes_Users object.
 */
export async function addUserType_User({UserID, UserTypeID, UserLevel}) {
    let isCreate = await pool.query(
        `INSERT INTO UserTypes_Users(UserTypeID, UserID, UserLevel)
         VALUES(?, ?, ?);`, [UserTypeID, UserID, UserLevel]
    );
    return isCreate;
};

/**update exists UserTypes_Users connection,
 * the argument is the new values as object of UserTypes_Users (with UserTypes_UsersID).
*/
export async function updateUserTypes_Users(newUserTypes_Users) {
    let oldUserTypes_Users = await getUserTypes_Users(newUserTypes_Users.UserTypes_UsersID);
    let updateKeys = createUpdateKeys(oldUserTypes_Users, newUserTypes_Users);
    let updateValues = createUpdateValues(updateKeys, newUserTypes_Users);
    let [isUpdate] = await pool.query(
    `UPDATE UserTypes_Users
     SET ${updateKeys.map((key) => `${key} = ?`).join(", ")}
     WHERE UserTypes_UsersID = '${newUserTypes_Users.UserTypes_UsersID}';`, updateValues
    );
    return isUpdate["info"];
}

/**delete UserTypes_Users perematly, the argument is UserTypes_Users id number. */
export async function delelteUserTypes_Users(UserTypes_UsersID) {
    let isDeleted = await pool.query(
        `DELETE FROM UserTypes_Users 
         WHERE UserTypes_UsersID = ?`, [UserTypes_UsersID] 
    );
    return isDeleted;
}

async function test() {
    let UserTypes_Users = {
        UserTypes_UsersID : 3,
        UserTypeID : 1,
        UserID : 1,
        UserLevel : 3
    }
    let UserTypes_Users1 = {
        UserTypeID : 1,
        UserID : 2,
        UserLevel : 4
    }
    // let res = await addUserType_User(UserTypes_Users1);
    // let res = await getUserTypeLevel(2, 1);
    // let res = await getUserTypes_Users(7);
    // let res = await getAllUserTypesPerUserID(1);
    // let res = await getAllUsersPerUserTypeID(1);
    // let res = await updateUserTypes_Users(UserTypes_Users);
    // let res = await delelteUserTypes_Users(6);
    console.log(res);
    
};
// test();