import DatabaseQueryModel from "./DatabaseQueryModel.js";

class UserModel {

    login = async (login_data) => {
        const response_data = { status: false, result: {}, error: null };
        const query = `
            SELECT * FROM users
            WHERE email = ? AND password = ?;
        `;

        try{
            const [result] = await DatabaseQueryModel.executeQuery(query, login_data);
            if(result){
                response_data.status = true;
                response_data.result = result;
            }
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    register = async (user_data) => {
        const response_data = { status: false, result: {}, error: null };
        const query = `
            INSERT INTO users SET ?
        `;

        try{
            const result = await DatabaseQueryModel.executeQuery(query, user_data);
            if(result){
                response_data.status = true;
                response_data.result = result;
            }
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}

export default new UserModel();