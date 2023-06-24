export const checkFields = (field_names, form_data) => {
    let response_data = { status: false, result: {}, error: [] };

    for(let i in field_names){
        let field_name = field_names[i];
        let value = (form_data[field_name] ? form_data[field_name].trim() : undefined);

        if(!value){
            response_data.error.push(field_name + " is required");
        }
        else{
            response_data.result[field_name] = value;
        }
    }
    
    if(response_data.error.length === 0){
        response_data.status = true;
    }

    return response_data;
}