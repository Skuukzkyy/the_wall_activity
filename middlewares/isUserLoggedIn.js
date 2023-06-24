export default (request, response, next) => {
    if(request.session.user){
        response.redirect("/wall");
    }
    else{
        next();
    }
}