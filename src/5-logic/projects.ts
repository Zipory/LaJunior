import {DAL} from "../2-utils/new-DAL.js"


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
    let project = await dal.selectWhere(tableName, ProjectID);
    return project;
}

/**add new project to the database,
 * the argument is object of the new project.
 */
export async function addProject(newproject: object) {
    let isCreate =  await dal.post(newproject, tableName);
    return isCreate;
}

/**update exists project
 * the argument is the new values as object of project (with ProjectID).
*/
export async function updateProject(project: object) {
    let isUpdate = dal.update(project, tableName)
    return isUpdate;
}

/**delete project, change the column 'isDeleted' to be true (1).
 * @param ProjectID is a number of the project-id.
 */
export async function deleteProject(Project: object) {
    let ProjectID: any;
    if ('ProjectID' in Project) {
        ProjectID = Project.ProjectID;
        let isDeleted = await dal.setIsDeleted(tableName, ProjectID);
        return isDeleted;
    }
    return "no projectID in this project."
};



async function test() {
    let project = {
        ProjectID: 4,
        ProjectName: "ssssss", 
        Description : "not needed project!",
        ProjectOwner : 1
    }
    let UserID = 3;
    
    let person2 = {
        UserID : 2,
        UserName : "Moty",
         Email : "bos@bos",
          Phone : "05123123321",
           Password : "1234321",
            Description : "very nice guy "
    }
    // let res = await addProject(project);
    // let res = await getAllProjects();
    let res = await getProject(4);
    // let res = await updateProject(project);
    // let res = await deleteProject(project);
    console.log(res);
    process.exit(0);
}
// test();