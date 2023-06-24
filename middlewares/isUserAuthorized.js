export default (request, response, next) => {
    if(request.session.user === undefined){
        response.redirect("/");    
    }
    else{
        next();
    }
}