import React, { useState, useEffect, useRef, useReducer } from "react";
import ChatBoxForm from "./ChatBoxForm";
import {
  getRandomInteger,
  playerWinResponse,
  playerBustResponse,
  runningOutTimeResponse,
  playerLoseResponse,
  decodeHtmlEntity
} from "../utils/util-functions";
import { applyCensorship } from "../utils/api-utils";
import { tallySplitResults } from "../utils/util-functions";
import { MessageBox, CommentBox, MessageContainer, HideChat, MessagingIcon } from "./styled-components";
import Minimise from "../images/minimise.png";
import ChatIcon from "../images/chat.png";
import { commentsReducer } from "../utils/comments-reducer";
import { unreadMessageReducer } from "../utils/unread-message-reducer";

const ChatBox = ({ playerBust, gameResult, secondsLeft, split, curHand }) => {

  // each comment will be in the form {name: "", message: ""}
  const initialComments = {posts: []};
  const [comments, commentsDispatch] = useReducer(commentsReducer, initialComments)
  
  // add new comment to the list of comments displayed in chat. if it is the player commenting dealer replies with an insult
  function addComment(comment, user) {
    applyCensorship(comment).then((censoredComment) => {
      commentsDispatch({type: "add_user_comment", data: {name: user, message: censoredComment}})
    })
  }

  // returns insult that is censored 
  async function getInsult() {
    const response = await fetch("https://clare-cors-server.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    const insult = await response.json();
    const decodedInsult = decodeHtmlEntity(insult.insult);
    const censoredInsult = await applyCensorship(decodedInsult);
    return censoredInsult;
  }
  
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if(comments.posts[comments.posts.length - 1].name !== "Dealer") {
      getInsult().then((insult) => {
        commentsDispatch({type: 'add_dealer_comment', data: insult})
      })
      return;
    }
  }, [comments])

  useEffect(() => {

    if (split && curHand === 1) {
        let results = tallySplitResults(playerBust, gameResult);
        results.win += results.blackJack;

        if (results.win === 2 || results.win === 1) {
            console.log("two wins or or one win one push");
            const message =
              playerWinResponse[getRandomInteger(playerWinResponse.length - 1)];
            commentsDispatch({type: "add_dealer_comment", data: message})
            return;
        } else if (results.lose === 2 || (results.lose === 1 && results.push === 1)) {
            console.log("two losses or one loss one push"); 
            const message = playerLoseResponse[getRandomInteger(playerLoseResponse.length - 1)];
            getInsult().then(insult => {
              commentsDispatch({type: "add_dealer_comment", data: message})
              commentsDispatch({type: "add_dealer_comment", data: insult})
            })
            return;
        } 
    } else if (!split) {
        if (gameResult.win) {
            console.log("player wins");
            const message =
              playerWinResponse[getRandomInteger(playerWinResponse.length - 1)];
              commentsDispatch({type: "add_dealer_comment", data: message})
            return;
          } else if (gameResult.condition === "lose_to_dealer") {
            if (!playerBust){
              console.log("player loses");
              const message = playerLoseResponse[getRandomInteger(playerLoseResponse.length - 1)];
              getInsult().then(insult => {
                commentsDispatch({type: "add_dealer_comment", data: message})
                commentsDispatch({type: "add_dealer_comment", data: insult})
              })
              return;
            } else {
              console.log("player's gone bust");
              const message =
                  playerBustResponse[getRandomInteger(playerBustResponse.length - 1)];
              getInsult().then(insult => {
                commentsDispatch({type: "add_dealer_comment", data: message})
                commentsDispatch({type: "add_dealer_comment", data: insult})})
              return;
            }
              
          } 
    }
  }, [playerBust, split, curHand, gameResult]);


  // render insult when timer has 5 seconds left
  useEffect(() => {
    if (secondsLeft === 5){
      const message =
        runningOutTimeResponse[getRandomInteger(runningOutTimeResponse.length - 1)];
        commentsDispatch({type: "add_dealer_comment", data: message})
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
  
  // use unreadMessage.count for number of unread messages
  const [unreadMessages, unreadMessagesDispatch] = useReducer(unreadMessageReducer, {count: 0})
  const [hideChat, setHideChat] = useState(true);
  const minimized = () => setHideChat(false);
  const expanded = () => setHideChat(true);

  // counts number of unread messages. resets when you hide chat and start counting from 0
  useEffect(() => {
    if(!hideChat){
      unreadMessagesDispatch({type: "increment"});
    }else {
      unreadMessagesDispatch({type: "reset"});
    }
  }, [comments, hideChat])

  return (
    <>
      { hideChat ? (<MessageContainer>
        <MessageBox>
          {comments.posts.map((comment, index) => (
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
        <HideChat src={Minimise} onClick={ minimized } />
      </MessageContainer>) : <MessagingIcon src={ChatIcon} onClick={expanded} alt="chat box" /> }
    </>
  );
};

export default ChatBox;
