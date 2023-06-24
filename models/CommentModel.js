import DatabaseQueryModel from "./DatabaseQueryModel.js";

class CommentModel {

    create = async (comment_data) => {

        let response_data = { status: false, result: {}, error: null };
        let query = "INSERT INTO comments SET ?";

        try{
            let result = await DatabaseQueryModel.executeQuery(query, comment_data);
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
        let response_data = { status: false, result: {}, error: null };
        let query = "DELETE FROM comments WHERE id = ?";

        try{
            let result = await DatabaseQueryModel.executeQuery(query, [comment_id]);
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