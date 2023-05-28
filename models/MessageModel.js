import DatabaseQueryModel from "./DatabaseQueryModel.js";

class MessageModel {

    create = async (user_id, message) => {
        const response_data = { status: false, result: {}, error: null };
        const query = `
            INSERT INTO messages(user_id, message)
            VALUES(?, ?);
        `;

        try{
            const result = await DatabaseQueryModel.executeQuery(query, [user_id, message]);
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
        const response_data = { status: false, result: {}, error: null };
        const query = `
            SELECT 
                messages.id AS message_id,
                messages.user_id AS message_owner_id,
                CONCAT(message_user.first_name, ' ', message_user.last_name) AS message_owner_name,
                messages.message,
                DATE_FORMAT(messages.created_at, "%D %M %Y") AS message_posted_at,
                comments.id AS comment_id,
                comments.user_id AS comment_owner_id,
                CONCAT(comment_user.first_name, ' ', comment_user.last_name) AS comment_owner_name,
                comments.comment,
                DATE_FORMAT(comments.created_at, "%D %M %Y") AS comment_posted_at
            FROM messages
            LEFT JOIN users AS message_user
                ON message_user.id = messages.user_id
            LEFT JOIN comments
                ON messages.id = comments.message_id
            LEFT JOIN users AS comment_user
                ON comment_user.id = comments.user_id
            ORDER BY message_id DESC, comment_id DESC;
        `;

        try{
            const result = await DatabaseQueryModel.executeQuery(query);
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
        const response_data = { status: false, result: {}, error: null };
        const query = `
            DELETE FROM messages
            WHERE id = ?
        `;

        try{
            const result = await DatabaseQueryModel.executeQuery(query, [message_id]);
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