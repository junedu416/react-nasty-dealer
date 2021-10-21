import React, {useState} from 'react';
import ChatBoxForm from './ChatBoxForm';



const ChatBox = () => {
    // each comment will be in the form {name: "", message: ""}
    const initialComments = []
    const [comments, setComments] = useState(initialComments)


    // add new comment to the list of comments displayed in chat
    function addComment(comment, user) {
        setComments(
            [...comments,
                {
                    name: user,
                    message: comment
                }
            ]
        )
    }


    return(
        <div>
            {comments.map((comment, index) => <div key={index}><p>{comment.name}: {comment.message}</p></div>)}
            <ChatBoxForm addComment={addComment} />
        </div>
    )
}

export default ChatBox