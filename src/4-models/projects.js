import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import {pool, initializeDbPool} from "./mysql_connection.js"

// only in develop time!
await initializeDbPool();
//

/**Return array of projects. */
export async function getAllProjects() {
    let [projects] = await pool.query(
        `SELECT ProjectID,  ProjectName, ProjectOwner, Description, ProjectStartDate, ProjectEndDate
         FROM Projects
         WHERE isDeleted = 0`
    )
    return projects;
}

/**Return object with project info,
 * get argument project id number.
 */
export async function getProject(ProjectID) {
    let [[project]] = await pool.query(
        `SELECT ProjectID, ProjectName, ProjectOwner, Description, ProjectStartDate, ProjectEndDate
         FROM Projects
         WHERE ProjectID = ?`, [ProjectID]
    );
    return project;
}

/**add new project to the database,
 * the first argument is object of the new project,
 * the second is object of the user that create the project.
 */
export async function addProject({ProjectName, Description}, {UserID}) { 
    let [isCreated] = await pool.query(
        `INSERT INTO Projects(ProjectName, Description, ProjectOwner)
         VALUES(?, ?, ?);`, [ProjectName, Description, UserID]
    );
    return isCreated["affectedRows"];
}

/**update exists project
 * the argument is the new values as object of project (with ProjectID).
*/
export async function updateProject(project) {
    let oldProject = await getProject(project.ProjectID);
    let updateKeys = createUpdateKeys(oldProject, project);
    let updateValues = createUpdateValues(updateKeys, project);
    let [isUpdate] = await pool.query(
    `UPDATE Projects
     SET ${updateKeys.map((key) => `${key} = ?`).join(", ")}
     WHERE ProjectID = '${project.ProjectID}';`, updateValues
    );
    return isUpdate["info"];
}

/**delete project, change the column 'isDeleted' to be true (1). */
export async function deleteProject({ProjectID}) {
    let [isDeleted] = await pool.query(
        `UPDATE Projects
         SET isDeleted = 1
         WHERE ProjectID = '?';`, ProjectID
        );
    return isDeleted;
}



async function test() {
    let project = {
        ProjectID: 1,
        ProjectName: "cccccc", 
        Description : "I want to check my email<not>",
        ProjectOwner : 2
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
    let res = await addProject(project, person2);
    // let res = await updateProject(project);
    // let res = await deleteProject(project);
    console.log(res);
    
}
test();