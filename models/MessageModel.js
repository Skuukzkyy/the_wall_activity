import DatabaseQueryModel from "./DatabaseQueryModel.js";

class MessageModel {

    create = async (message_data) => {
        let response_data = { status: false, result: {}, error: null };
        let query = "INSERT INTO messages SET ?;";

        try{
            let result = await DatabaseQueryModel.executeQuery(query, message_data);
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

    getAllMessagesWithComments = async () => {
        let response_data = { status: false, result: {}, error: null };
        
        let query = `
            SELECT 
                messages.id, 
                messages.user_id AS message_owner_id, 
                CONCAT(users.first_name, ' ', users.last_name) AS message_owner_name, 
                messages.message, 
                DATE_FORMAT(messages.created_at, "%D %M %Y") AS message_posted_at,
                (
                    SELECT JSON_OBJECTAGG(
                        comments.id, 
                        JSON_OBJECT(
                            "comment_owner_id", comments.user_id,
                            "comment_owner_name", CONCAT(users.first_name, ' ', users.last_name), 
                            "comment", comment, 
                            "comment_posted_at", DATE_FORMAT(comments.created_at, "%D %M %Y"))
                        )
                    FROM comments
                    INNER JOIN users ON users.id = comments.user_id
                    WHERE comments.message_id = messages.id
                    ORDER BY comments.id DESC
                ) AS message_comments
            FROM messages
            INNER JOIN users ON users.id = messages.user_id
            ORDER BY messages.id DESC;
        `;

        try{
            let result = await DatabaseQueryModel.executeQuery(query);
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

    destroy = async (message_id) => {
        let response_data = { status: false, result: {}, error: null };
        let query = "DELETE FROM messages WHERE id = ?;";

        try{
            let result = await DatabaseQueryModel.executeQuery(query, [message_id]);
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

export default new MessageModel();