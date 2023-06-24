import DatabaseQueryModel from "./DatabaseQueryModel.js";

class CommentModel {

    create = async (comment_data) => {

        const response_data = { status: false, result: {}, error: null };
        const query = "INSERT INTO comments SET ?";

        try{
            const result = await DatabaseQueryModel.executeQuery(query, comment_data);
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
        const query = "DELETE FROM comments WHERE id = ?";

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