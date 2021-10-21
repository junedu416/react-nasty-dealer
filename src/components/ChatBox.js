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
        if (user !== "Dealer") {
            getInsult(comment, user);
        }
    }
    // asynchronously retrieves insult from api and set comment along with reply
    function getInsult(comment, user) {
        fetch(
            "https://clare-cors-server.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => setComments([...comments,
                {
                    name: user,
                    message: comment
                },
                {
                    name: "Dealer",
                    message: data.insult
                }
            ]))
            .catch((error) => console.error(error));
    }


    return(
        <div>
            {comments.map((comment, index) => <div key={index}><p>{comment.name}: {comment.message}</p></div>)}
            <ChatBoxForm addComment={addComment} />
        </div>
    )
}

export default ChatBox