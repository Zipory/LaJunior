import { Where } from "../2-utils/calsses.js";
import {DAL} from "../2-utils/new-DAL.js"
import { idKeyValuePair } from "../2-utils/useful-functions.js";


const tableName: string = 'projects';
let dal :DAL = new DAL;

/**Return array of projects. */
export async function getAllProjects() : Promise<any> {
    let projects = await dal.select(tableName);
    return projects;
}

/**Return object with project info,
 * get argument project id number.
 */
export async function getProject(ProjectID: number) : Promise<any>{
    let project: any = await dal.selectWhere(tableName, ProjectID);
    return project;
}

/** Return array of all the project per the owner, 
 * @param user is argument is the user that is the owner of the projects outcome.
 */
export async function getAllProjectsPerProjectOwner(user: object) : Promise<any> {
      let array: Where[] = [];
    //    array.push(new Where(...idKeyValuePair(user)));
       let [key, value] = idKeyValuePair(user);
       array.push(new Where('ProjectOwner', value));
       let row = await dal.selectWhereMulty(tableName, array);
       return row;
};

/**add new project to the database,
 * the argument is object of the new project.
 */
export async function addProject(newproject: object) {
    let isCreate =  await dal.post(newproject, tableName);
    return isCreate;
};

/**update exists project
 * the argument is the new values as object of project (with ProjectID).
*/
export async function updateProject(project: object) {
    let isUpdate = dal.update(tableName, project)
    return isUpdate;
}

/**delete project, change the column 'isDeleted' to be true (1).
 * @param Project is the project object.
 */
export async function deleteProject(Project: object) {
    let ProjectsID: any;
    if ('ProjectsID' in Project) {
        ProjectsID = Project.ProjectsID;
        let isDeleted = await dal.setIsDeleted(tableName, ProjectsID);
        return isDeleted;
    }
    return "no projectsID in this project."
};



async function test() {
    let project = {
        // ProjectsID: 2,
        ProjectName: "qqqaa", 
        Description : "best project ever and ever and ever!!!",
        ProjectOwner : 2
    }
    let UserID = 3;
    
    let person2 = {
        UsersID : 1,
        UserName : "Moty",
        Email : "bos@bos",
        Phone : "05123123321",
        Password : "1234321",
        Description : "very nice guy "
    }
    // let res = await addProject(project);
    // let res = await getAllProjects();
    // let res = await getProject(2);
    let res = await getAllProjectsPerProjectOwner(person2);
    // let res = await updateProject(project);
    // let res = await deleteProject(project);
    console.log(res);
    process.exit(0);
}
test();