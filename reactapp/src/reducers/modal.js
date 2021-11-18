export default function(openModal = true, action){
    if(action.type == 'cancelModal'){
        var newModal = false
        return newModal
    } else {
        return openModal
    }
}