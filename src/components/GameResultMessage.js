import React from 'react';
import {GoldText, MessageAlert, BlackjackBackground} from './styled-components/index'

const GameResultMessage = ({resultMessage}) => {

    return (
        <>
        {resultMessage.result === "BLACKJACK" ? (<BlackjackBackground><GoldText> BLACKJACK </GoldText></BlackjackBackground>) : <MessageAlert>{resultMessage.result}</MessageAlert>}
        
        </>
    )
}

export default GameResultMessage;