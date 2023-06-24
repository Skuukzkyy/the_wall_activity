import { isEmpty } from "../helpers/isEmpty.js";
import UserModel from "../models/UserModel.js";

class SessionsController {

    create = async (request, response) => {
        if(request.session.user){
            return response.redirect("/wall");
        }

        let { email, password } = request.body;
        
        if(isEmpty(email, password)){
            console.log("error");
            return response.redirect("/");
        }
        
        let result = await UserModel.login([email, password]);
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