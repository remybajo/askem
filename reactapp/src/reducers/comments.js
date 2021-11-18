export default function(commentairesList = [], action){
    if(action.type == 'addComment'){
        var copyCommentairesList = [...commentairesList];
        copyCommentairesList.push(action.newComment)
        return copyCommentairesList;
    } else if (action.type == 'updateLikes') {
        return action.listComments
    } else {
        return commentairesList
    }
}