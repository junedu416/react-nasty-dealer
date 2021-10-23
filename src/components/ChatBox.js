import React, { useState, useEffect, useRef } from "react";
import ChatBoxForm from "./ChatBoxForm";
import {
  getRandomInteger,
  playerWinResponse,
  playerBustResponse,
  runningOutTimeResponse,
  playerLoseResponse,
  decodeHtmlEntity,
} from "../utils/util-functions";
import { applyCensorship } from "../utils/api-utils";
import { MessageBox, CommentBox, MessageContainer } from "./styled-components";


const ChatBox = ({ playerBust, dealerBust, timerMode }) => {

  // each comment will be in the form {name: "", message: ""}
  const initialComments = [];
  const [comments, setComments] = useState(initialComments);

  // add new comment to the list of comments displayed in chat
  function addComment(comment, user) {
    applyCensorship(comment).then((censoredComment) => {
      setComments([
        ...comments,
        {
          name: user,
          message: censoredComment,
        },
      ]);
      if (user !== "Dealer") {
        getInsult(censoredComment, user);
      }
    });
  }

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
      .then((data) => decodeHtmlEntity(data.insult))
      .then((insult) => applyCensorship(insult))
      .then((filteredInsult) => addDealerComment(filteredInsult, comment, user))
      .catch((error) => console.error(error));
  }

  function addDealerComment(insult, comment, user) {
    if (comment && user) {
      setComments([
        ...comments,
        {
          name: user,
          message: comment,
        },
        {
          name: "Dealer",
          message: insult,
        },
      ]);
    } else {
      setComments([
        ...comments,
        {
          name: "Dealer",
          message: insult,
        },
      ]);
    }
  }
  // render insult after dealer win
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else if (playerBust) {
      console.log("player's gone bust");
      const message =
        playerBustResponse[getRandomInteger(playerBustResponse.length - 1)];
      getInsult(message, "Dealer");
      return;
    } else if (gameResult.win) {
      console.log("player wins");
      const message =
        playerWinResponse[getRandomInteger(playerWinResponse.length - 1)];
      addComment(message, "Dealer");
      return;
    } else if (gameResult.condition === "lose_to_dealer") {
        console.log("player loses");
        const message = playerLoseResponse[getRandomInteger(playerLoseResponse.length - 1)];
        getInsult(message, "Dealer");
    } else if (timerMode){
      const message =
        runningOutTimeResponse[getRandomInteger(runningOutTimeResponse.length - 1)];
        setTimeout(()=> {addComment(message, "Dealer")},10000);
      return;
    }
  }, [playerBust, dealerBust, timerMode]);


  // auto scroll messages container back to bottom    
  useEffect(() => {
    scrollToBottom()
  }, [comments]);

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }


  return (
    <>
      <MessageContainer>
        <MessageBox>
          {comments.map((comment, index) => (
            <div key={index}>
              <p style={{fontFamily: 'sans-serif', lineHeight: '1.5', margin: '0 5px 10px 2px'}}>
                <strong>{comment.name}:</strong> {comment.message}
              </p>
            </div>
          ))}
           <div ref={messagesEndRef} />
        </MessageBox>
        <CommentBox>
          <ChatBoxForm addComment={addComment} />
        </CommentBox>
      </MessageContainer>
    </>
  );
};

export default ChatBox;
