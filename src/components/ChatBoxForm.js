import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Send from '../images/send-button.png'
import { CommentButton } from './styled-components'
// import {getInsult} from '../utils/api-utils.js'

const ChatBoxForm = (props) => {
  const { addComment } = props;
  const [inputData, setInputData] = useState("");
  const user = localStorage.getItem("username") || "You";

  // form input value
  function handleInput(e) {
    setInputData(e.target.value);
  }
  // handle new comment submission
  function submitHandler(e) {
    e.preventDefault();
    if (inputData) {
      addComment(inputData, user);
      setInputData("");
    }
  }

  return (
    <form onSubmit={submitHandler} style={{display: 'flex'}}>
      <TextField id="standard-basic" variant="outlined" onChange={handleInput} value={inputData}  style={{width: '100%', backgroundColor: 'rgb(255, 255, 255, 0.5'}} />
      {/* <input type="text" onChange={handleInput} value={inputData} /> */}
      <CommentButton>
        <img src={Send} alt="send button" width="54px" />
      </CommentButton>
    </form>
  );
};

export default ChatBoxForm;
