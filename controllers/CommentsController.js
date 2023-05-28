import { isEmpty } from "../helpers/isEmpty.js";
import CommentModel from "../models/CommentModel.js";

class CommentsController {

    create = async (request, response) => {
        if(request.session.user === undefined){
            return response.redirect("/");
        }
        
        const { message_id, comment } = request.body;
        const user_id = request.session.user.id;
        const is_empty = isEmpty(comment);

        if(is_empty){
            console.log("error");
        }
        else{
            const result = await CommentModel.create(user_id, message_id, comment);
            console.log(result);
        }

        response.redirect("/wall");
    }

    destroy = async (request, response) => {
        if(request.session.user === undefined){
            return response.redirect("/");
        }

        const { comment_id } = request.body;
        const result = await CommentModel.destroy(comment_id);
        console.log(result)
        if(result.status){
        console.log("deleted");
        }

        response.redirect("/wall");
    }
}

export default new CommentsController();