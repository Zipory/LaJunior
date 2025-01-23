import {DAL} from "../2-utils/new-DAL.js"


const tableName: string = 'Jobs';
let dal :DAL = new DAL;

/**return array of all jobs in the DB. */
export async function getAllJobs() {
    let rows = dal.select(tableName);
    return rows;
}

/**Return array of jobs per project. */
export async function getAllJobsPerProject(project: object) {
        let jobs = dal.selectPerAnotherID(tableName, project);
        return jobs;
    }

/**Return object with job info,
 * get argument job id number.
 */
export async function getJob(JobID:number) {
    let job = await dal.selectWhere(tableName, JobID);
    return job;
}

/**add new job to the database,
 * the argument is object of the new job info.
 */
export async function addJob(newJob: object) { 
    let isCreate = await dal.post(newJob, tableName);
    return isCreate;
}

/**update exists job
 * the argument is the new values as object of job (with JobID).
*/
export async function updateJob(job: object) {
    let isUpdate = dal.update(job, tableName)
    return isUpdate;
}

/**delete job perematly, the argument is job number. */
export async function deleteJob(job: object) {
    let isDeleted = await dal.delete(tableName, job)
    return isDeleted;
}

async function test() {
    let job = {
        'JobTitle' : "programer",
    'JobDescription' : "cood code handle with java (includ stream)",
    
    }
    let job2 = {
        "JobID" : 3,
        'JobTitle' : "designer",
    'JobDescription' : "good work with AI",
    }
    let job3 = {
        'JobTitle' : "programer",
    'JobDescription' : "best in DAL",
    ProjectID: 4
    }
    let project = {
        ProjectID : 3
    }
    let UserID = 3;
    // let res = await getAllJobsPerProject(project);
    let res = await getAllJobs();
    // let res = await getJob(3);
    // let res = await updateJob(job2);
    // let res = await addJob(job3);
    // let res = await deleteJob(job2);
    console.log(res);
    process.exit(0);
}
test();

// let str: string = "ddd";
// let arr: Array<string> = ['ggg', 'eeeID', 'fff'];
// let [res] = arr.filter((ar)=> ar.endsWith("ID"));
// console.log(res); 

// let obj:object = {name: 'ita', id: 5};
// let keys = Object.keys(obj);
// let [key] = keys.filter((ar)=> ar.endsWith("id"));
// console.log(key);
// console.log(32, obj[key]);