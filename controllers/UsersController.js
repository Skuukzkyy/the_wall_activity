import { isEmpty } from "../helpers/isEmpty.js";
import UserModel from "../models/UserModel.js";
import MessageModel from "../models/MessageModel.js";

class UsersController {

    index = async (request, response) => {
        if(request.session.user === undefined){
            return response.redirect("/");
        }

        let data = {
            user: {
                id: request.session.user.id,
                first_name: request.session.user.first_name
            }
        }

        let result = await MessageModel.getAllMessagesWithComments();
        if(result.status){
            data.messages_comments = result.result;
        }

        response.render("users/index", data);
    }

    loginRegister = (request, response) => {
        if(request.session.user){
            return response.redirect("/wall");
        }

        response.render("users/loginRegister");
    }

    create = async (request, response) => {
        if(request.session.user){
            return response.redirect("/wall");
        }
        
        let { first_name, last_name, email, password, confirm_password } = request.body;
        let is_empty = isEmpty(first_name, last_name, email, password, confirm_password);

        if(is_empty || password !== confirm_password){
            console.log("error");
        }
        else{
            let result = await UserModel.register({ first_name, last_name, email, password });
            console.log(result);
        }

        response.redirect("/");
    }
}

export default new UsersController();