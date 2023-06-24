import { checkFields } from "../helpers/checkFields.js";
import UserModel from "../models/UserModel.js";

class SessionsController {

    create = async (request, response) => {
        if(request.session.user){
            return response.redirect("/wall");
        }

        let check_fields = checkFields(["email", "password"], request.body);

        if(!check_fields.status){
            console.log(check_fields.error);
            return response.redirect("/");
        }
        
        let result = await UserModel.login([check_fields.result.email, check_fields.result.password]);
        
        if(result.status){
            request.session.user = {
                id: result.result.id,
                first_name: result.result.first_name
            }
        }
        
        response.redirect("/wall");
    }
}

export default new SessionsController();