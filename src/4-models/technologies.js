import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import {pool, initializeDbPool} from "./mysql_connection.js"

// only in develop time!
await initializeDbPool();
//

/**Return array of all Technologies. */
export async function getAllTechnologies() {
    let [technologies] = await pool.query(
        `SELECT TechnologyID, TechnologyName
         FROM technologies`
    )
    return technologies;
}

/**Return object with technology info,
 * get argument technology id number.
 */
export async function getTechnology(TechnologyID) {
    let [[technology]] = await pool.query(
         `SELECT TechnologyID, TechnologyName
          FROM technologies
          WHERE TechnologyID = ?`, [TechnologyID]
    );
    return technology;
}

/**add new technology to the database. */
export async function addTechnology({TechnologyName}) {
    let isCreate = await pool.query(
        `INSERT INTO technologies(TechnologyName)
         VALUES(?);`, [TechnologyName]
    );
    return isCreate;
}

/**update exists technology
 * the argument is the new values as object of technology (with TechnologyID).
*/
export async function updatetechnology(newTechnology) {
    let oldTecnology = await getTechnology(newTechnology.TechnologyID);
    let updateKeys = createUpdateKeys(oldTecnology, newTechnology);
    let updateValues = createUpdateValues(updateKeys, newTechnology);
    let [isUpdate] = await pool.query(
    `UPDATE technologies
     SET ${updateKeys.map((key) => `${key} = ?`).join(", ")}
     WHERE TechnologyID = '${newTechnology.TechnologyID}';`, updateValues
    );
    return isUpdate["info"];
}

/**delete Technology perematly, the argument is technology number. */
export async function deletetechnologiy(TechnologyID) {
    let isDeleted = await pool.query(
        `DELETE FROM technologies 
         WHERE TechnologyID = ?`, [TechnologyID] 
    );
    return isDeleted;
}

async function test() {
   let tech = {
    "TechnologyID": 1,
    "TechnologyName": 'server-sql'
   }
    let res = await addTechnology(tech);
    // let res = await getAllTechnologies();
    // let res = await getTechnology(3);
    // let res = await updatetechnology(tech);
    // let res = await deletetechnologiy(1);

    console.log(res);
}
// test();