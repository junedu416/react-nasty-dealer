import React, {useState} from 'react';
// import {getInsult} from '../utils/api-utils.js'

const ChatBoxForm = (props) => {
    const{addComment} = props;
    const [inputData, setInputData] = useState("");
    const user = (localStorage.getItem("username") || "You");


    // form input value
    function handleInput(e) {
        setInputData(e.target.value)
    }
    // handle new comment submission
   function submitHandler(e) {
        e.preventDefault();
        if (inputData) {
            addComment(inputData, user);
            setInputData("");
        }
    }


    return(
        <form onSubmit={submitHandler}>
                <input type='text'  onChange={handleInput} value={inputData} />
                <button>Comment</button>
        </form>
    )
}

export default ChatBoxForm