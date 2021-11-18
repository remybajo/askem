import React, { useState, useEffect, createElement } from "react";
import { Avatar, Comment, Tooltip} from "antd";

import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled} from "@ant-design/icons";



function Commentaires(props) {

    const [actionLike, setActionLike] = useState(props.thumbUp);
    const [actionDislike, setActionDislike] = useState("");
    const [likeComment, setLikeComment] = useState(false)
    const [dislikeComment, setDislikeComment] = useState(false)

    const [idC, setIdC] = useState(0)
    const [countLike, setCountLike] = useState(0)
    const [totalLike, setTotalLike] = useState(props.nb_likes)
    const [countDislike, setCountDislike] = useState(0)
    const [totalDislike, setTotalDislike] = useState(props.nb_dislikes)

    const [idComment, setIdComment] = useState("");

    useEffect(() => {
      if (props.alreadyLiked) {
        setActionLike(true)
      };
      if (props.alreadyDisliked) {
        setActionDislike(true)
      };
    },[])


  var handleLike = (id_comment) => {

    setIdComment(id_comment);
    console.log("id du comment: ", id_comment)
    console.log("id du user: ", props.userId)
      
      //setLikeComment(!likeComment)
      if(!actionLike) {
          setActionLike(true);
          setCountLike(1);
          setTotalLike(totalLike+1)

          if(actionDislike) {
            setActionDislike(false)
            setCountDislike(0);

            if(totalDislike>0) {
              setTotalDislike(totalDislike-1)
            }
            }
      } else {
          setActionLike(false);
          setCountLike(0);
          setTotalLike(totalLike-1)
          //setCountDislike(countDislike)
          //setTotalLike(props.nb_likes)
      }    
  
  }
 
var handleDislike = (id_comment) => {
    setIdComment(id_comment)

    //setDislikeComment(!dislikeComment)
        if (!actionDislike) {
            setActionDislike(true);
            setCountDislike(1)
            setTotalDislike(totalDislike+1)
            if (actionLike) {
              setActionLike(false)
            setCountLike(0)
            setTotalLike(totalLike-1)
            }

        } else {
            setActionDislike(false);
            setCountDislike(0)
            //setCountLike(countLike)
            setTotalDislike(totalDislike-1)
        }
}

useEffect(() => {
  console.log("check like: ", countLike);
  console.log("check dislike: ", countDislike);
  var updateLikes = async () => {
    await fetch("/comments/updateLikes", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `userId=${props.userId}&commentId=${idComment}&like=${countLike}&dislike=${countDislike}`,
    });
  };
  updateLikes()
},[countLike, countDislike])

    return (

        <Comment
         
              actions={[
                <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={() => handleLike(props.id)}>
                    {createElement(actionLike === true ? LikeFilled : LikeOutlined)}
                    {/* <span className="comment-action">{countLike}</span> */}
                  </span>
                </Tooltip>,
                <span key="comment-basic-reply-to" style={{backgroundColor:'beige'}}>{totalLike + " likes"}</span>,
                <Tooltip key="comment-basic-dislike" title="Dislike">
                  <span onClick={() => handleDislike(props.id)}> 
                    {React.createElement(actionDislike === true ? DislikeFilled : DislikeOutlined)}
                    {/* <span className="comment-action">{countDislike}</span> */}
                  </span>
                </Tooltip>,
                <span key="comment-basic-reply-to" style={{backgroundColor:'beige'}}>{totalDislike + " dislikes"}</span>,
              ]}
              author={props.vote}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
              content={
                <p>{props.commentaire}</p>
              }
              />)

}

export default Commentaires;