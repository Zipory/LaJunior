import { Join, Where } from "../2-utils/calsses.js";
import {DAL} from "../2-utils/new-DAL.js"
import { idKeyValuePair } from "../2-utils/useful-functions.js";


const tableName: string = 'Job_Technology';
let dal :DAL = new DAL;




/**Return array of all jobs.
 */
export async function getAllJobTechnology() {
        let rows = dal.select(tableName);
    return rows;
}

/**Return array of all jobs per technology-id,
 * get argument technology-id number.
 */
export async function getAllJobsPerTechnologyID(Technology: object) {
    let joins: Join[] = [];
    joins.push( new Join("Jobs", "JobsID") );
    joins.push( new Join("Technologies", "TechnologiesID") );
    let userTypes = dal.selectJoin(tableName, joins, Technology);
    return userTypes;
}

/**Return array of all technologies per job-id,
 * get argument job-id number.
 */
export async function getAllTechnologiesPerJobID(job: object) {
    let joins: Join[] = [];
    joins.push( new Join("Technologies", "TechnologiesID") );
    joins.push( new Join("Jobs", "JobsID") );
    let userTypes = dal.selectJoin(tableName, joins, job);
    return userTypes;
}

/**Return object with Job_Technology info,
 * get argument Job_Technology-id number.
 */
export async function getJob_Technology(Job_TechnologyID) {

}


/**Return the userTypeLevel number,
 * get arguments of jobID and technologyID numbers.
 */
export async function getUserTypeLevel(JobID, TechnologyID) {

}

/**add new Job_Technology to the database,
 * get argument Job_Technology object.
 */
export async function addJob_Technology(job_technology: JobTechnology) {
    let isCreate = await dal.post(job_technology, tableName);
    return isCreate;
}

/**update exists Job_Technology connection,
 * the argument is the new values as object of Job_Technology (with Job_TechnologyID).
*/
export async function updateJob_Technology(newJob_Technology) {

}

/**delete Job_Technology perematly, the argument is Job_Technology id number. */
export async function delelteJob_Technology(Job_TechnologyID) {

}

class JobTechnology  {
    Job_TechnologyID: number;
    JobsID: number;
    TechnologiesID: number;
    UserLevel: number;

    constructor(JobsID: number, TechnologiesID: number, UserLevel: number, Job_TechnologyID: number = 0 ) {
        this.Job_TechnologyID = Job_TechnologyID;
        this.JobsID = JobsID;
        this.TechnologiesID = TechnologiesID;
        this.UserLevel = UserLevel;
    };
};

async function test() {
    let job = {
        JobsID: 2
    }
    let tech = {
        TechnologiesID: 1
    }
    // let job_tech = new JobTechnology(3, 3, 4);
    // let res = await addJob_Technology(job_tech);
    // let res = await getAllJobTechnology();
    // let res = await getAllJobsPerTechnologyID(tech);
    let res = await getAllTechnologiesPerJobID(job);
    // let res = await getUserTypeLevel(5, 2);
    // let res = await updateJob_Technology(job_tech);
    // let res = await delelteJob_Technology(7);

    console.log(res);
    process.exit(20);
}

test();