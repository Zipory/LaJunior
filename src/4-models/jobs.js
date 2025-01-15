import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import { initializeDbPool, pool } from "./mysql_connection.js";

// only in develop time!
await initializeDbPool();
//

/**Return array of jobs per project. */
export async function getAllJobsPerProject(ProjectID) {
    let [job] = await pool.query(
         `SELECT JobID, JobTitle, JobDescription, ProjectID
          FROM Jobs
          WHERE ProjectID = ?`, [ProjectID]
    );
    return job;
}


/**Return object with job info,
 * get argument job id number.
 */
export async function getJob(JobID) {
    let [[job]] = await pool.query(
         `SELECT JobID, JobTitle, JobDescription, ProjectID
          FROM Jobs
          WHERE JobID = ?`, [JobID]
    );
    return job;
}

/**add new job to the database,
 * the first argument is object of the new job info,
 * the second is object of the project that need that job.
 */
export async function addJob({JobTitle, JobDescription}, {ProjectID}) { 
    let [isCreated] = await pool.query(
        `INSERT INTO Jobs(JobTitle, JobDescription, ProjectID)
         VALUES(?, ?, ?);`, [JobTitle, JobDescription, ProjectID]
    );
    return isCreated;
}

/**update exists job
 * the argument is the new values as object of job (with JobID).
*/
export async function updateJob(newJob) {
    let oldJob = await getJob(newJob.JobID); 
    let updateKeys = createUpdateKeys(oldJob, newJob);
    let updateValues = createUpdateValues(updateKeys, newJob);
    let [isUpdate] = await pool.query(
    `UPDATE Jobs
     SET ${updateKeys.map((key) => `${key} = ?`).join(", ")}
     WHERE JobID = '${newJob.JobID}';`, updateValues
    );
    return isUpdate["info"];
}

/**delete job perematly, the argument is job number. */
export async function deleteJob(JobID) {
    let isDeleted = await pool.query(
        `DELETE FROM Jobs 
         WHERE JobID = ?`, [JobID] 
    );
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
    'JobDescription' : "good work with figma",
    }
    let job3 = {
        'JobTitle' : "programer",
    'JobDescription' : "backend with paython",
    }
    let project = {
        'ProjectID' : 1
    }
    let UserID = 3;
    // let res = await getAllJobsPerProject(3);
    // let res = await getJob(3);
    // let res = await updateJob(job2);
    let res = addJob(job3, project);
    // let res = await deleteJob(5);
    console.log(res);
}
// test();