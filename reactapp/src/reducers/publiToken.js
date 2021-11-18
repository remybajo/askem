export default function(publiToken = null, action){
    if(action.type == 'addPubliToken'){
        return action.publiToken
    } else {
        return publiToken
    }
}