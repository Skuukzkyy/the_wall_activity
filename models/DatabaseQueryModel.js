import mysql from 'mysql2';
import { DATABASE_CONFIG } from '../configs/constants.js'


class DatabaseQueryModel{
    connectDb(){
        return mysql.createConnection(DATABASE_CONFIG);
    }

    executeQuery(userQuery, values){
        const query = mysql.format(userQuery, values);
        const connection = this.connectDb();

        return new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                this.close(connection);
                
                if(err){
                    resolve(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }

    close(connection){
        connection.end();
    }
}

export default new DatabaseQueryModel();