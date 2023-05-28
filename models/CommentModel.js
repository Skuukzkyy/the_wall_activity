import DatabaseQueryModel from "./DatabaseQueryModel.js";

class CommentModel {

    create = async (user_id, message_id, comment) => {
        const response_data = { status: false, result: {}, error: null };
        const query = `
            INSERT INTO comments(user_id, message_id, comment)
            VALUES(?, ?, ?);
        `;

        try{
            const result = await DatabaseQueryModel.executeQuery(query, [user_id, message_id, comment]);
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

    destroy = async (comment_id) => {
        const response_data = { status: false, result: {}, error: null };
        const query = `
            DELETE FROM comments
            WHERE id = ?
        `;

        try{
            const result = await DatabaseQueryModel.executeQuery(query, [comment_id]);
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

export default new CommentModel();