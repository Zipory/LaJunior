import {DAL, Join} from "../2-utils/new-DAL.js"


const tableName: string = 'UserTypes_Users';
let dal :DAL = new DAL;


export async function getAllUserTypes() {
    let rows = await dal.select(tableName);
    return rows;
}

/**Return array of all user-types per user-id,
 * get argument user-id number.
 */
export async function getAllUserTypesPerUserID(User: object) {
    let join: Join = new Join("usertypes", "UserTypeID");
    let joins = [join];
    let userTypes = dal.selectJoin(tableName, joins, User);
    return userTypes;
}

/**Return array of all users per userType-id,
 * get argument userType-id number.
 */
export async function getAllUsersPerUserTypeID(userType: object) {
    let join: Join= new Join("Users", "UserID");
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
 * get arguments of user-id and userType-id numbers.
 */
export async function getUserTypeLevel(UserID, UserTypeID) {

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
export async function updateUserTypes_Users(newUserTypes_Users) {

}

/**delete UserTypes_Users perematly, the argument is UserTypes_Users id number. */
export async function delelteUserTypes_Users(UserTypes_UsersID) {

}


async function test() {
    let UserTypes_Users = {
        UserTypes_UsersID : 3,
        UserTypeID : 1,
        UserID : 1,
        UserLevel : 3
    }
    let UserTypes_Users1 = {
        UserTypeID : 2,
        UserID : 3,
        UserLevel : 1
    }
    let user = {
        UserID : 2
    }
    let user_type = {
        UserTypeID: 2
    }
    let res = await addUserType_User(UserTypes_Users1);
    // let res = await getUserTypeLevel(2, 1);
    // let res = await getUserTypes_Users(7);
    // let res = await getAllUserTypes();
    // let res = await getAllUserTypesPerUserID(user);
    // let res = await getAllUsersPerUserTypeID(user_type);
    // let res = await updateUserTypes_Users(UserTypes_Users);
    // let res = await delelteUserTypes_Users(6);
    console.log(res);
    process.exit(0);
};
test();