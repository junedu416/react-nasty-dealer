import React from 'react';
import Alert from '@mui/material/Alert';

const WarningMessage = ({message, closeWarning}) => {
   
    return(
        <div>
            <Alert severity="warning" onClose={closeWarning}>{message}</Alert>
        </div>
    )
}

export default WarningMessage;