import { checkFields } from "../helpers/checkFields.js";
import MessageModel from "../models/MessageModel.js";

class MessagesController {

    create = async (request, response) => {
        let check_fields = checkFields(["message"], request.body);

        if(!check_fields.status){
            console.log("error");
        }
        else{
            let result = await MessageModel.create({ user_id: request.session.user.id, message: check_fields.result.message });
            console.log(result);
        }

        response.redirect("/wall");
    }

    destroy = async (request, response) => {
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