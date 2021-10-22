import React, {useState, useEffect, useRef} from 'react';
import ChatBoxForm from './ChatBoxForm';
import {getRandomInteger, playerWinResponse, playerBustResponse} from '../utils/util-functions';
import { applyCensorship } from '../utils/api-utils';




const ChatBox = ({playerBust, dealerBust}) => {
    // each comment will be in the form {name: "", message: ""}
    const initialComments = []
    const [comments, setComments] = useState(initialComments)


    // add new comment to the list of comments displayed in chat
    function addComment(comment, user) {
        applyCensorship(comment).then( censoredComment => {
            setComments(
                [...comments,
                    {
                        name: user,
                        message: censoredComment
                    }
                ]
            )
            if (user !== "Dealer") {
                getInsult(censoredComment, user);
            }
        })
    }

    function getInsult(comment, user) {
        fetch("https://clare-cors-server.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json",
                {
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
                .then((response) => response.json())
                .then(data => applyCensorship(data.insult))
                .then(insult => addDealerComment(insult, comment, user))
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
    // render insult after dealer win
    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        } else if (playerBust){
            console.log("player's gone bust")
            const message = playerBustResponse[getRandomInteger(playerBustResponse.length - 1)]
            getInsult(message, "Dealer");
            return;
        } 
        else if(dealerBust) {
            console.log("dealer's gone bust")
            const message = playerWinResponse[getRandomInteger(playerWinResponse.length - 1)]
            addComment(message, "Dealer");
            return;
        }
    }, [playerBust, dealerBust])


    return(
        <div>
            {comments.map((comment, index) => <div key={index}><p>{comment.name}: {comment.message}</p></div>)}
            <ChatBoxForm addComment={addComment} />
        </div>
    )
}

export default ChatBox