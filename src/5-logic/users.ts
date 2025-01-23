import {DAL} from "../2-utils/new-DAL.js"


const tableName: string = 'users';
let dal :DAL = new DAL;



/**Return array of users. */
export async function getAllUsers() : Promise<any> {
    let users = await dal.select(tableName);
    return users;
}

/**Return object with user info,
 * get argument user id number.
 */
export async function getUser(UserID: number) :Promise<any> {
    let user = await dal.selectWhere(tableName, UserID);
    return user;
}

/**add new user to the database. */
export async function addUser(newUser: object) {
    let isCreate =  await dal.post(newUser, tableName);
    return isCreate;
}

/**update exists user
 * the argument is the new values as object of user (with UserID).
*/
export async function updateUser(user: object) {
    let isUpdate = dal.update(tableName, user)
    return isUpdate;
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
        UserName : "Beny",
         Email : "change@good",
          Phone : "051238776661",
           Password : "222222",
            Description : "vote for trump "
    }
    // let res = await addUser(person2);
    let res = await getAllUsers();
    // let res = await getUser(2) ;
    // let res = await updateUser(person2) ;

    console.log(res);
    process.exit(0);
}
// test();


