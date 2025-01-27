import { Join, Where } from "../2-utils/calsses.js";
import {DAL} from "../2-utils/new-DAL.js"
import { idKeyValuePair } from "../2-utils/useful-functions.js";


const tableName: string = 'UserTypes_Users';
let dal :DAL = new DAL;


export async function getAllUserTypes() {
    let rows = await dal.select(tableName);
    return rows;
}

/**Return array of all user-types per user-id,
 * get argument user object.
 */
export async function getAllUserTypesPerUserID(User: object) {
    let join: Join = new Join("usertypes", "UserTypesID");
    let joins = [join];
    let userTypes = dal.selectJoin(tableName, joins, User);
    return userTypes;
}

/**Return array of all users per userType-id,
 * get argument userType-id number.
 */
export async function getAllUsersPerUserTypeID(userType: object) {
    let join: Join= new Join("Users", "UsersID");
    let joins = [join];
    let users = dal.selectJoin(tableName, joins, userType);
    return users;   
}

/**Return object with UserTypes_Users info,
 * get argument UserTypes_Users-id number.
 */
export async function getUserTypes_Users(UserTypes_UsersID: number) {
    let userType_user = await dal.selectWhere(tableName, UserTypes_UsersID);
    return userType_user;
}

/**Return the userTypeLevel number,
 * get arguments of user and userType as objects.
 */
export async function getUserTypeLevel(user: object, userType: object) {
    let array: Where[] = [];
    array.push(new Where(...idKeyValuePair(user)));
    array.push(new Where(...idKeyValuePair(userType)));
    let row = await dal.selectWhereMulty(tableName, array);
    return row;
}

/**add new UserTypes_Users to the database,
 * get argument UserTypes_Users object.
 */
export async function addUserType_User(newUserType_User: object) {
    let isCreate =  await dal.post(newUserType_User, tableName);
    return isCreate;
}

/**update exists UserTypes_Users connection,
 * the argument is the new values as object of UserTypes_Users (with UserTypes_UsersID).
*/
export async function updateUserTypes_Users(newUserTypes_Users: object) {
    let isUpdate = dal.update(tableName, newUserTypes_Users);
    return isUpdate;
}

/**delete UserTypes_Users perematly, the argument is UserTypes_Users id number. */
export async function delelteUserTypes_Users(UserTypes_UsersID: object) {
    let isDeleted = await dal.delete(tableName, UserTypes_UsersID);
    return isDeleted;
}


async function test() {
    let UserTypes_Users = {
        UserTypes_UsersID : 1,
        UserTypesID : 2,
        UsersID : 2,
        UserLevel : 2
    }
    let UserTypes_Users1 = {
        UserTypesID : 5,
        UsersID : 2,
        UserLevel : 3
    }
    let user = {
        UsersID : 1
    }
    let user_type = {
        UserTypesID: 2
    }
    // let res = await addUserType_User(UserTypes_Users1);
    // let res = await getUserTypeLevel(user, user_type);
    let res = await getUserTypes_Users(10);
    // let res = await getAllUserTypes();
    // let res = await getAllUserTypesPerUserID(user);
    // let res = await getAllUsersPerUserTypeID(user_type);
    // let res = await updateUserTypes_Users(UserTypes_Users);
    // let res = await delelteUserTypes_Users(UserTypes_Users);
    console.log(res);
    process.exit(0);
};
test();