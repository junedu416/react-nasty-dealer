import React, {useState} from 'react';

const ChatBoxForm = (props) => {
    const{addComment} = props;
    const [inputData, setInputData] = useState("");

    // form input value
    function handleInput(e) {
        setInputData(e.target.value)
    }
    // handle new comment submission
    function submitHandler(e) {
        e.preventDefault();
        addComment(inputData, "You");
        setInputData("");
    }

    return(
        <form onSubmit={submitHandler}>
                <input type='text'  onChange={handleInput} value={inputData} />
                <button>Comment</button>
        </form>
    )
}

export default ChatBoxForm