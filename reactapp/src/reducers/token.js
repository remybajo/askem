export default function(token = null, action){
    if(action.type == 'addToken'){
        return action.token
    } else if (action.type == 'deleteToken') {  
        return null
    } else {
        return token
    }
}