import { isEmpty } from "../helpers/isEmpty.js";
import MessageModel from "../models/MessageModel.js";

class MessagesController {

    create = async (request, response) => {
        if(request.session.user === undefined){
            return response.redirect("/");
        }
        
        let { message } = request.body;
        let is_empty = isEmpty(message);

        if(is_empty){
            console.log("error");
        }
        else{
            let result = await MessageModel.create(request.session.user.id, message);
            console.log(result);
        }

        response.redirect("/wall");
    }

    destroy = async (request, response) => {
        if(request.session.user === undefined){
            return response.redirect("/");
        }

        let { message_id } = request.body;
        let result = await MessageModel.destroy(message_id);
        console.log(result)
        if(result.status){
        console.log("deleted");
        }

        response.redirect("/wall");
    }
}

export default new MessagesController();