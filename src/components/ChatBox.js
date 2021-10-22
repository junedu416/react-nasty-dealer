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

    function getInsult(comment, user) {
        fetch("https://clare-cors-server.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json",
                {
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
                .then((response) => response.json())
                .then(data => addDealerComment(data.insult, comment, user))
                .catch(error => console.error(error))
    }

    function addDealerComment(insult, comment, user) {
        if (comment && user ){
            setComments([...comments,
                            {
                                name: user,
                                message: comment
                            },
                            {
                                name: "Dealer",
                                message: insult
                            }
                        ]
            )
        } else {
            setComments([...comments,
                {
                    name: "Dealer",
                    message: insult
            }
            ])
        }
    }


    return(
        <div>
            {comments.map((comment, index) => <div key={index}><p>{comment.name}: {comment.message}</p></div>)}
            <ChatBoxForm addComment={addComment} />
        </div>
    )
}

export default ChatBox