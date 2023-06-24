import { checkFields } from "../helpers/checkFields.js";
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
        
        let check_fields = checkFields(["first_name", "last_name", "email", "password", "confirm_password"], request.body);
    
        if(!check_fields.status || check_fields.result.password !== check_fields.result.confirm_password){
            console.log("error", check_fields.error);
        }
        else{
            let result = await UserModel.register({ first_name: check_fields.result.first_name, last_name: check_fields.result.last_name, email: check_fields.result.email, password: check_fields.result.password });
            console.log(result);
        }


        response.redirect("/");
    }
}

export default new UsersController();