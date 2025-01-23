import {DAL} from "../2-utils/new-DAL.js"


const tableName: string = 'UserTypes';
let dal :DAL = new DAL;



/**Return array of all UserTypes. */
export async function getAllUserTypes() {
    let array = dal.select(tableName);
    return array;
}

/**Return object with userType info,
 * get argument userType id number.
 */
export async function getUserType(UserTypeID: number) {
    let userType = await dal.selectWhere(tableName, UserTypeID);
    return userType;
}
/**add new userType to the database. */
export async function addUserType(newUserType: object) {
    let isCreate =  await dal.post(newUserType, tableName);
    return isCreate;
}
/**update exists userType
 * the argument is the new values as object of userType (with UserTypeID).
*/
export async function updateUserType(newUserType: object) {
    let isUpdate = await dal.update(tableName, newUserType);
    return isUpdate;
}
/**delete userType perematly, the argument is userType object. */
export async function delelteUserType(userType: object) {
    let isDeleted = dal.delete(tableName, userType);
    return isDeleted;
}
async function test() {
    let usertype = {
     'UserTypeName': 'manager'
    }
    let usertype2 = {
      'UserTypeID': 5,
     'UserTypeName': 'Marketing'
    }
    //  let res = await addUserType(usertype2);
     let res = await getAllUserTypes();
    //  let res = await getUserType(5);
    //  let res = await updateUserType(usertype2);
    //  let res = await delelteUserType(usertype2);
 
     console.log(res);
     process.exit(0);
    }
//  test();