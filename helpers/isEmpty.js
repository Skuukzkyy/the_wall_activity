export const isEmpty = (...args) => {
    for(let i in args){
        const arg = args[i];
        
        if(!arg){
            return true;
        }
    }

    return false;
}