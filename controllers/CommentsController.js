import { checkFields } from "../helpers/checkFields.js";
import CommentModel from "../models/CommentModel.js";

class CommentsController {

    create = async (request, response) => {
        let check_fields = checkFields(["comment", "message_id"], request.body);

        if(!check_fields.status){
            console.log("error");
        }
        else{
            // let { message_id, comment } = check_fields.result;
            // let result = await CommentModel.create({ user_id: request.session.user.id, message_id, comment });
            let result = await CommentModel.create({ user_id: request.session.user.id, message_id: check_fields.result.message_id, comment: check_fields.result.comment });
            console.log(result);
        }

        response.redirect("/wall");
    }

    destroy = async (request, response) => {
        let { comment_id } = request.body;
        let result = await CommentModel.destroy(comment_id);
        console.log(result)
        
        if(result.status){
        console.log("deleted");
        }

        response.redirect("/wall");
    }
}

export default new CommentsController();