import React from 'react';

const WarningMessage = ({message, closeWarning}) => {
   
    return(
        <div>
        <h3>{message}</h3>
        <button onClick={closeWarning}>Close</button>
        </div>
    )
}

export default WarningMessage;