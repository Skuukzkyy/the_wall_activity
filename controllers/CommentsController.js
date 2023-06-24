import { isEmpty } from "../helpers/isEmpty.js";
import CommentModel from "../models/CommentModel.js";

class CommentsController {

    create = async (request, response) => {
        if(request.session.user === undefined){
            return response.redirect("/");
        }
        
        let { message_id, comment } = request.body;
        let is_empty = isEmpty(comment);

        if(is_empty){
            console.log("error");
        }
        else{
            let result = await CommentModel.create(request.session.user.id, message_id, comment);
            console.log(result);
        }

        response.redirect("/wall");
    }

    destroy = async (request, response) => {
        if(request.session.user === undefined){
            return response.redirect("/");
        }

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