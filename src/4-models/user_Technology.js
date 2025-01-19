import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import {pool, initializeDbPool} from "./mysql_connection.js"

// only in develop time!
await initializeDbPool();
//


/**Return array of all technologies per user-id,
 * get argument user-id number.
 */
export async function getAllTechnologyPerUserID(UserID) {
    let [technology] = await pool.query(
         `SELECT Technologies.TechnologyID, TechnologyName, UserLevel
		  FROM User_Technology
          JOIN Technologies 
          ON Technologies.TechnologyID = User_Technology.TechnologyID
		  WHERE UserID = ?;`, [UserID]
    );
    return technology;
}

/**Return array of all users per technologiy-id,
 * get argument technologiy-id number.
 */
export async function getAllUsersPerUserTechnologiyID(TechnologyID) {
    let [users] = await pool.query(
         `SELECT users.UserID, UserName, UserLevel
          FROM User_Technology
          JOIN users
          ON User_Technology.UserID = users.UserID
          WHERE TechnologyID = ?;`, [TechnologyID]
    );
    return users;
}


/**Return object with User_Technology info,
 * get argument User_Technology-id number.
 */
export async function getUser_Technology(User_TechnologyID) {
    let [[user_Technology]] = await pool.query(
         `SELECT User_TechnologyID, UserID, TechnologyID, UserLevel
          FROM User_Technology
          WHERE User_TechnologyID = ?`, [User_TechnologyID]
    );
    return user_Technology;
}

/**Return object with userTypeLevel,
 * get arguments of user-id and technology-id numbers.
 */
export async function getUserTypeLevel(UserID, TechnologyID) {
    let [[userTypeLevel]] = await pool.query(
         `SELECT UserLevel
          FROM User_Technology
          WHERE TechnologyID = ? AND UserID = ?;`, [TechnologyID, UserID]
    );
    return userTypeLevel;
}


/**add new User_Technology to the database,
 * get argument User_Technology object.
 */
export async function addUser_Technology({UserID, TechnologyID, UserLevel}) {
    let isCreate = await pool.query(
        `INSERT INTO User_Technology(TechnologyID, UserID, UserLevel)
         VALUES(?, ?, ?);`, [TechnologyID, UserID, UserLevel]
    );
    return isCreate;
};

/**update exists User_Technology connection,
 * the argument is the new values as object of User_Technology (with User_TechnologyID).
*/
export async function updateUser_Technology(newUser_Technology) {
    let oldUser_Technology = await getUser_Technology(newUser_Technology.User_TechnologyID);
    let updateKeys = createUpdateKeys(oldUser_Technology, newUser_Technology);
    let updateValues = createUpdateValues(updateKeys, newUser_Technology);
    let [isUpdate] = await pool.query(
    `UPDATE User_Technology
     SET ${updateKeys.map((key) => `${key} = ?`).join(", ")}
     WHERE User_TechnologyID = '${newUser_Technology.User_TechnologyID}';`, updateValues
    );
    return isUpdate["info"];
};

/**delete User_Technology perematly, the argument is User_Technology id number. */
export async function delelteUser_Technology(User_TechnologyID) {
    let isDeleted = await pool.query(
        `DELETE FROM User_Technology 
         WHERE User_TechnologyID = ?`, [User_TechnologyID] 
    );
    return isDeleted;
}


async function test() {
    let user_tech1 = {
        User_TechnologyID : 3,
        TechnologyID : 1,
        UserID : 1,
        UserLevel : 3
    }
    // let res = await addUser_Technology(user_tech);
    // let res = await getUser_Technology(2);
    // let res = await getUserTypeLevel(1, 2);
    // let res = await getAllUsersPerUserTechnologiyID(2);
    // let res = await getAllTechnologyPerUserID(1);
    // let res = await getAllTechnologyPerUserID(1);
    // let res = await updateUser_Technology(user_tech1);
    let res = await delelteUser_Technology(2);
    console.log(res);
};
test();