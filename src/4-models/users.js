import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import {pool, initializeDbPool} from "./mysql_connection.js"

// only in develop time!
await initializeDbPool();
//

/**Return array of users. */
export async function getAllUsers() {
    let [users] = await pool.query(
        `SELECT UserID, UserName, Email, Phone, Password, Description
         FROM users`
    )
    return users;
}

/**Return object with user info,
 * get argument user id number.
 */
export async function getUser(UserID) {
    let [[user]] = await pool.query(
         `SELECT UserID, UserName, Email, Phone, Password, Description
          FROM users
          WHERE UserID = ?`, [UserID]
    );
    return user;
}

/**add new user to the database. */
export async function addUser({UserName, Email, Phone, Password, Description}) {
    let isCreate = await pool.query(
        `INSERT INTO users(UserName, Phone, Email, Password, Description)
         VALUES(?, ?, ?, ?, ?);`, [UserName, Email, Phone, Password, Description]
    );
    return isCreate;
}

/**update exists user
 * the argument is the new values as object of user (with UserID).
*/
export async function updateUser(user) {
    let oldUser = await getUser(user.UserID);
    let updateKeys = createUpdateKeys(oldUser, user);
    let updateValues = createUpdateValues(updateKeys, user);
    let [isUpdate] = await pool.query(
    `UPDATE users
     SET ${updateKeys.map((key) => `${key} = ?`).join(", ")}
     WHERE UserID = '${user.UserID}';`, updateValues
    );
    return isUpdate["info"];
}

// TODO: rigth now there is no delete to users.



async function test() {
    let person = {
        UserName : "moty",
         Email : "sos@sos",
          Phone : 1234,
           Password : "aq1sw2",
            Description : "nice guy"
    }
    let person2 = {
        UserID : 3,
        UserName : "Yosy",
         Email : "bos@bos",
          Phone : "05123123321",
           Password : "1234321",
            Description : "very nice guy "
    }
    let res1 = await addUser(person2);
    let res = await getAllUsers() ;
    console.log(res1);
}
test();


