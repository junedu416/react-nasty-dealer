import React from 'react';
import {GoldText, MessageAlert} from './styled-components/index'

const GameResultMessage = ({resultMessage}) => {

    return (
        <>
        {resultMessage.result === "BLACKJACK" ? (<GoldText> BLACKJACK </GoldText>) : <MessageAlert>{resultMessage.result}</MessageAlert>}
        
        </>
    )
}

export default GameResultMessage;