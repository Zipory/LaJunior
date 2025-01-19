import { createUpdateKeys, createUpdateValues } from "../5-logic/usersLogic.js";
import { initializeDbPool, pool } from "./mysql_connection.js";

// only in develop time!
await initializeDbPool();
//


/**Return array of all jobs per technology-id,
 * get argument technology-id number.
 */
export async function getAllJobsPerTechnologyID(TechnologyID) {
    let [jobs] = await pool.query(
         `SELECT TechnologyID, Jobs.JobID, JobTitle, JobDescription
		  FROM Jobs
          JOIN Job_Technology 
          ON Job_Technology.JobID = Jobs.JobID
		  WHERE TechnologyID = ?;`, [TechnologyID]
    );
    return jobs;
}


/**Return array of all technologies per job-id,
 * get argument job-id number.
 */
export async function getAllTechnologiesPerJobID(JobID) {
    let [technologies] = await pool.query(
         `SELECT job_technology.TechnologyID, TechnologyName, UserLevel
          FROM job_technology
          JOIN Technologies
          ON job_technology.TechnologyID = Technologies.TechnologyID
          WHERE job_technology.JobID = ?;`, [JobID]
    );
    return technologies;
}


/**Return object with Job_Technology info,
 * get argument Job_Technology-id number.
 */
export async function getJob_Technology(Job_TechnologyID) {
    let [[job_Technology]] = await pool.query(
         `SELECT Job_TechnologyID, JobID, TechnologyID, UserLevel
          FROM Job_Technology
          WHERE Job_TechnologyID = ?`, [Job_TechnologyID]
    );
    return job_Technology;
};

/**Return the userTypeLevel number,
 * get arguments of jobID and technologyID numbers.
 */
export async function getUserTypeLevel(JobID, TechnologyID) {
    let [[userTypeLevel]] = await pool.query(
         `SELECT UserLevel
          FROM Job_Technology
          WHERE TechnologyID = ? AND JobID = ?;`, [TechnologyID, JobID]
    );
    return userTypeLevel;
};


/**add new Job_Technology to the database,
 * get argument Job_Technology object.
 */
export async function addJob_Technology({JobID, TechnologyID, UserLevel}) {
    let isCreate = await pool.query(
        `INSERT INTO Job_Technology(TechnologyID, JobID, UserLevel)
         VALUES(?, ?, ?);`, [TechnologyID, JobID, UserLevel]
    );
    return isCreate;
};


/**update exists Job_Technology connection,
 * the argument is the new values as object of Job_Technology (with Job_TechnologyID).
*/
export async function updateJob_Technology(newJob_Technology) {
    let oldJob_Technology = await getJob_Technology(newJob_Technology.Job_TechnologyID);
    let updateKeys = createUpdateKeys(oldJob_Technology, newJob_Technology);
    let updateValues = createUpdateValues(updateKeys, newJob_Technology);
    let [isUpdate] = await pool.query(
    `UPDATE Job_Technology
     SET ${updateKeys.map((key) => `${key} = ?`).join(", ")}
     WHERE Job_TechnologyID = '${newJob_Technology.Job_TechnologyID}';`, updateValues
    );
    return isUpdate["info"];
};


/**delete Job_Technology perematly, the argument is Job_Technology id number. */
export async function delelteJob_Technology(Job_TechnologyID) {
    let isDeleted = await pool.query(
        `DELETE FROM Job_Technology 
         WHERE Job_TechnologyID = ?`, [Job_TechnologyID] 
    );
    return isDeleted;
}




async function test() {
    let job_tech = {
        Job_TechnologyID : 7,
        JobID : 6,
        TechnologyID : 1,
        UserLevel : 1
    }
    // let res = await addJob_Technology(job_tech);
    // let res = await getAllJobsPerTechnologyID(1);
    // let res = await getAllTechnologiesPerJobID(5);
    let res = await getUserTypeLevel(5, 2);
    // let res = await updateJob_Technology(job_tech);
    // let res = await delelteJob_Technology(7);

    console.log(res);
}

test();