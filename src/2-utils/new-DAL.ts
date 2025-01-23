import mysql, { Pool, PoolOptions } from 'mysql2/promise';
import appConfig from './app-config';
import { object } from 'joi';

console.log("hi friand!");
/** DAL will handle akk the connections to the database. */
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
        const [[row]] = await pool.query(
            `SELECT * FROM ${tableName}
            where ${rowID} = ?`, id);
        return row;
    }
    async selectPerAnotherID(tableName: string, obj: object): Promise<mysql.QueryResult>{
        const pool = await this.initializeDbPool();
        let keys = Object.keys(obj);
        let [idKey] = keys.filter((ar)=> ar.endsWith("ID"));
        let idValue = obj[idKey] ;
        const [row] = await pool.query(
            `SELECT * FROM ${tableName}
            where ${idKey} = ?`, idValue);
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

    async update(obj: object, tableName: string): Promise<[mysql.QueryResult, mysql.FieldPacket[]]> {
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

    async selectJoin(tableName: string, joins: Join[]): Promise<mysql.QueryResult> {
        const pool = await this.initializeDbPool();
        let sql = `SELECT * FROM ${tableName}`;

        joins.forEach(join => {
            sql += `JOIN ${join.tableName} ON ${tableName}.${join.valueName} = ${join.tableName}.${join.valueName}`;
        });

        const [rows] = await pool.query(sql);
        return rows;
    }
    /**Delete a specific row in a table. */
    async delete( tableName: string, obj: object) {
        const pool = await this.initializeDbPool();
        let [key, id] = idKeyValuePair(obj);
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

export class Join {
    tableName: string;
    valueName: string;

    constructor(tableName: string, valueName: string) {
        this.tableName = tableName;
        this.valueName = valueName;
    }
}

/**Return string that pressent the row-id. */
function idTransforme(tableName: string) :string {
    return tableName.substring(0,tableName.length-1)+'ID';
}

/**Return key :value of the ID in object. */
function idKeyValuePair(obj: object) :Array<[string, number]> {
    let keys = Object.keys(obj);
    let [idKey] = keys.filter((ar)=> ar.endsWith("ID"));
    let idValue = obj[idKey] ;
    return [idKey, idValue];
}