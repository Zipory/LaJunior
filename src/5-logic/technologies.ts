import {DAL} from "../2-utils/new-DAL.js"


const tableName: string = 'technologies';
let dal :DAL = new DAL;


/**Return array of all Technologies. */
export async function getAllTechnologies() {
    let rows = dal.select(tableName);
    return rows;
}



/**Return object with technology info,
 * get argument technology id number.
 */
export async function getTechnology(technologiesID: number) {
    let job = await dal.selectWhere(tableName, technologiesID);
    return job;
}


/**add new technology to the database. */
export async function addTechnology(TechnologyName: object) {
    let isCreate = await dal.post(TechnologyName, tableName);
    return isCreate;
}



/**update exists technology
 * the argument is the new values as object of technology (with TechnologyID).
*/
export async function updatetechnology(newTechnology: object) {
    let isUpdate = dal.update(tableName, newTechnology)
    return isUpdate;
}


/**delete Technology perematly, the argument is technology number. */
export async function deletetechnologiy(technology: object) {
    let isDeleted = await dal.delete(tableName, technology);
    return isDeleted;
}

async function test() {
    let tech = {
    //  "TechnologyID": 1,
     "TechnologyName": 'Figma'
    }
    //  let res = await addTechnology(tech);
     let res = await getAllTechnologies();
     // let res = await getTechnology(3);
     // let res = await updatetechnology(tech);
     // let res = await deletetechnologiy(1);
 
     console.log(res);
     process.exit(0);
 }
 test();