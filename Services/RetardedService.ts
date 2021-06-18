import {RetardedAttribute} from "../Models/RetardedModels";
import databaseInstance from "./MysqlService";
import {verifyPassword} from "./SecurityService";

export async function authRetarded(username: string, password: string): Promise<RetardedAttribute> {
    const user = await databaseInstance.query<RetardedAttribute>('SELECT * FROM retardeds WHERE username = ?', [username]);

    if (!user || user.length < 1) {
        throw "USER_DOES_NOT_EXIST";
    }
    
    if (await verifyPassword(user[0].password, user[0].salt, password)) {
        return user[0]
    }

    return null;   
}

export async function getRetardedById(id: number): Promise<RetardedAttribute> {
    const user = await databaseInstance.query<RetardedAttribute>('SELECT * FROM retardeds WHERE id = ?', [id.toString(10)]);
    return user?.[0];
}

export async function getRetardedByUsername(username: string): Promise<RetardedAttribute> {
    const user = await databaseInstance.query<RetardedAttribute>('SELECT * FROM retardeds WHERE username = ?', [username]);
    return user?.[0];
}

export async function createRetarded(retarded: RetardedAttribute): Promise<number[]> {
    return databaseInstance.insert(`
    INSERT INTO 
        retardeds (id, username, password, salt, role, email, firstname, lastname) 
    VALUES 
        (NULL, ?, ?, ?, ?, ?, ?, ?)
    `, [retarded.username, retarded.password, retarded.salt, retarded.role, retarded.email, retarded.firstname || 'NULL', retarded.lastname || 'NULL']);
}