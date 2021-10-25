import React from "react";

const WinAmount = ({amount}) => {
    return(
        <>
        {amount >= 0 ? (<h3>Win: ${amount}</h3>) : (<h3 style={{color: "red"}}>Lose: ${Math.abs(amount)}</h3>)} 
        </>
    )
}

export default WinAmount