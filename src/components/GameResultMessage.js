import React from 'react';

const GameResultMessage = ({resultMessage}) => {

    return (
        <>
        {resultMessage.result === "GAME OVER. GO HOME" ? <h3>GAME OVER. GO HOME</h3> :
        <h3>{resultMessage.result}{resultMessage.winAmount && `: ${resultMessage.winAmount}`}</h3>}
        </>
    )
}

export default GameResultMessage;