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
import { tallySplitResults } from "../utils/util-functions";
import { MessageBox, CommentBox, MessageContainer } from "./styled-components";


const ChatBox = ({ playerBust, gameResult, secondsLeft, split, curHand }) => {

  // each comment will be in the form {name: "", message: ""}
  const initialComments = [];
  const [comments, setComments] = useState(initialComments);

  // add new comment to the list of comments displayed in chat. if it is the player commenting dealer replies with an insult
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

    // adds custom comment + insult from dealer
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

  // Dealer adds custom comment and/or API insult according to game result
  const firstUpdate = useRef(true);
  useEffect(() => {

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else if (split && curHand === 1) {
        let results = tallySplitResults(playerBust, gameResult);
        results.win += results.blackJack;

        if (results.win === 2 || results.win === 1) {
            console.log("two wins or or one win one push");
            const message =
              playerWinResponse[getRandomInteger(playerWinResponse.length - 1)];
            addComment(message, "Dealer");
            return;
        } else if (results.lose === 2 || (results.lose === 1 && results.push === 1)) {
            console.log("two losses or one loss one push"); 
            const message = playerLoseResponse[getRandomInteger(playerLoseResponse.length - 1)];
            getInsult(message, "Dealer");
            return;
        } 
    } else if (!split) {
        if (playerBust){
            console.log("player's gone bust");
            const message =
                playerBustResponse[getRandomInteger(playerBustResponse.length - 1)];
            getInsult(message, "Dealer");
            return;
        }else if (gameResult.win) {
            console.log("player wins");
            const message =
              playerWinResponse[getRandomInteger(playerWinResponse.length - 1)];
            addComment(message, "Dealer");
            return;
          } else if (gameResult.condition === "lose_to_dealer") {
              console.log("player loses");
              const message = playerLoseResponse[getRandomInteger(playerLoseResponse.length - 1)];
              getInsult(message, "Dealer");
              return;
          } 
    } 
  }, [playerBust, split, curHand, gameResult]);

  // render insult when timer has 5 seconds left
  useEffect(() => {
    if (secondsLeft === 5){
      const message =
        runningOutTimeResponse[getRandomInteger(runningOutTimeResponse.length - 1)];
        addComment(message, "Dealer")
      return;
    }
  }, [secondsLeft])



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
