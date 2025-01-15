import { keys } from "../2-utils/list-of-keys.js";
/**function used when update user.
 * get the old user and the update one
 * return array with the keys that changes.
 */
export function createUpdateKeys(oldUser, user) {
    let updateKeys = [];
    keys.forEach(key => {
        if (oldUser[key] !== user[key])  updateKeys.push(key);
    });
    // if (oldUser.UserName !== user.UserName)  updateKeys.push("UserName"); 
    // if (oldUser.Email !== user.Email)  updateKeys.push("Email"); 
    // if (oldUser.Phone !== user.Phone)  updateKeys.push("Phone"); 
    // if (oldUser.Password !== user.Password)  updateKeys.push("Password"); 
    // if (oldUser.Description !== user.Description)  updateKeys.push("Description"); 
    return updateKeys;
}

/**The next function after createUpdateKeys.
 * get the array keys and the update user
 * return array with the values that changes.
 */
export function createUpdateValues(updateKeys, user) {
    let updateValues = [];
    updateKeys.forEach(element => {
        updateValues.push(user[element]);
    });
    return updateValues;
}