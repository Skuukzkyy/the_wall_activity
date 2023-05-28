import { isEmpty } from "../helpers/isEmpty.js";
import MessageModel from "../models/MessageModel.js";

class MessagesController {

    create = async (request, response) => {
        if(request.session.user === undefined){
            return response.redirect("/");
        }
        
        const { message } = request.body;
        const user_id = request.session.user.id;
        const is_empty = isEmpty(message);

        if(is_empty){
            console.log("error");
        }
        else{
            const result = await MessageModel.create(user_id, message);
            console.log(result);
        }

        response.redirect("/wall");
    }

    destroy = async (request, response) => {
        if(request.session.user === undefined){
            return response.redirect("/");
        }

        const { message_id } = request.body;
        const result = await MessageModel.destroy(message_id);
        console.log(result)
        if(result.status){
        console.log("deleted");
        }

        response.redirect("/wall");
    }
}

export default new MessagesController();