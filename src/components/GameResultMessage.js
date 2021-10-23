import React from 'react';

const GameResultMessage = ({resultMessage}) => {
       
    return (
        <>
        <h3>{resultMessage.result}: {resultMessage.winAmount}</h3>
        </>
    )
}

export default GameResultMessage;