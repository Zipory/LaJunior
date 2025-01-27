import mysql, { Pool, PoolOptions } from 'mysql2/promise';
import appConfig from './app-config';
import { idKeyValuePair, idTransforme } from './useful-functions';
import { Join, Where } from './calsses';
// import { object } from 'joi';

console.log("hi friand!");
/** DAL will handle all the connections to the database. */
export class DAL {
    public dbConfig: PoolOptions = {
        host: appConfig.host,
        user: appConfig.username,
        port: Number(appConfig.databasePort),
        password: appConfig.password,
        database: appConfig.database,
    };

    public pool: Pool | null = null;

    constructor() {
        // try {
        //     this.pool = mysql.createPool(this.dbConfig);
        // } catch (error) {
        //     console.error('Error creating database connection pool:', error.message);
        //     throw error;
        // }
    }

    /**Create the first connection to the database.
     * Returns back Pool object with connection functions.
     */
    public async initializeDbPool(): Promise<Pool> {
        if (!this.pool) {
            try {
                this.pool = mysql.createPool(this.dbConfig);
            } catch (error: any) {
                console.error('Error creating database connection pool:', error.message);
                throw error;
            }
        }
        return this.pool;
    }

    /**Returns back array of all the rows in a table,
      *@param tableName — The name of the table you need.
    */
    async select(tableName: string): Promise<mysql.QueryResult> {
        const pool = await this.initializeDbPool();
        const [rows] = await pool.query(`SELECT * FROM ${tableName}`); 
        return rows;
    }

    /**Returns a specific row.
      *@param query — String that pressent the query.
      *@param vars - array of values to insert the query. 
    */
    async query(query: string, vars: any[] = []): Promise<mysql.QueryResult> {
        const pool = await this.initializeDbPool();
        const [rows] = await pool.query(query, vars);
        return rows;
    }

    /**Returns a specific row per to ID number.
      *@param tableName — The name of the table you need.
      *@param id - The id number of the row. 
    */
    async selectWhere(tableName: string, id: number): Promise<mysql.QueryResult>{
        const pool = await this.initializeDbPool();
        const rowID = idTransforme(tableName);
        const [row] = await pool.query(
            `SELECT * FROM ${tableName}
            where ${rowID} = ?`, id);
        return row;
    }

    /**Return a specific row In accordance to some ids.
     * @param tableName the mane of the table.
     * @param arr=[] array of objects with {key, value},
     * the key is the name of the id,
     * the value is the id value.
     */
    async selectWhereMulty(tableName: string, arr: Where[] = []): Promise<any>{
        const pool = await this.initializeDbPool();
        
        let sql = `SELECT * FROM ${tableName} WHERE `;
        let val: (string | number)[] = [];
        arr.forEach( (obj, index) => {
            if (index > 0) {sql += " AND "};
            sql += ` ${obj.key} = ? `;
            val.push(obj.value);
        });
        sql += ';';
        console.log(sql);
        console.log(val);
        let [row] = await pool.query(sql, val);
        return row;
    }


    async selectPerAnotherID(tableName: string, obj: object): Promise<any>{
        const pool = await this.initializeDbPool();
        const [key, id]= idKeyValuePair(obj);
        let [row] = await pool.query(
            `SELECT * FROM ${tableName}
            where ${key} = ?`, id);
        return row;
    }

    /**Insert into the database a new row.
     * @param obj the new object that need to save in the DB.
     * @param tableName the table name that add the new row.
     */
    async post(obj: object, tableName: string): Promise<[mysql.QueryResult, mysql.FieldPacket[]]> {
        const pool = await this.initializeDbPool();
        const keys = Object.keys(obj).filter(key => key !== idTransforme(tableName));
        const values = keys.map(key => (obj as any)[key]);
        const placeholders = keys.map(() => '?').join(', ');
        const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
        let res = await pool.query(sql, values);
        return res;
    }

    /**Update a row in a table.
     * @param tableName is the table.
     * @param obj is the new object that need to replace the old row,
     * need to have ID number in it.
     */
    async update(tableName: string, obj: object): Promise<[mysql.QueryResult, mysql.FieldPacket[]]> {
        const pool = await this.initializeDbPool(); 
        const keys = Object.keys(obj);
        const id = idTransforme(tableName);
        const values = keys.map(key => (obj as any)[key]);
        values.push(values[0]);
        const sql =`UPDATE ${tableName}
          SET ${keys.map((key) => `${key} = ?`).join(',')}
           WHERE ${id} = ?;`;
        let res = await pool.query(sql, values);
        return res;
    };

    /**Return array of rows that represent the join table, In accordance to obj-ID.
     * @param tableName the main table.
     * @param joins array of Join class with [tableName, valueName] pairs.
     * @param obj an object represent the specific collection.
     */
    async selectJoin(tableName: string, joins: Join[], obj: object): Promise<mysql.QueryResult> {
        const pool = await this.initializeDbPool();
        let sql = `SELECT * FROM ${tableName} `;
        joins.forEach(join => {
            sql += `JOIN ${join.tableName} ON ${tableName}.${join.valueName} = ${join.tableName}.${join.valueName} `;
        });
        console.log(obj);
        const [key, id]= idKeyValuePair(obj);
        console.log(key + "  " + id);
        sql += `WHERE ${key} = ?;`
        const [rows] = await pool.query(sql, id);
        return rows;
    }

    /**Delete a specific row in a table. */
    async delete( tableName: string, obj: object) {
        const pool = await this.initializeDbPool();
        const [key, id]= idKeyValuePair(obj);
        let [isDeleted] = await pool.query(
            `DELETE FROM ${tableName} 
            WHERE ${key} = ?`, [id] 
        );
    return isDeleted;
    }

    /**change the column 'isDeleted' in specific row to be true (1). */
    async setIsDeleted(tableName: string, id: number): Promise<any> {
        const pool = await this.initializeDbPool();
        const rowID = idTransforme(tableName);
        let [isDeleted] = await pool.query(
            `UPDATE ${tableName}
             SET isDeleted = 1
             WHERE ${rowID} = '?';`, id
            );
        return isDeleted;
    }
}

// export async function deleteProject({ProjectID}) {
//     let [isDeleted] = await pool.query(
//         `UPDATE Projects
//          SET isDeleted = 1
//          WHERE ProjectID = '?';`, ProjectID
//         );
//     return isDeleted;
// }

// export class Join {
//     tableName: string;
//     valueName: string;

//     constructor(tableName: string, valueName: string) {
//         this.tableName = tableName;
//         this.valueName = valueName;
//     }
// }
