import React from "react";
import Alert from "@mui/material/Alert";

const WarningMessage = ({ message, closeWarning }) => {
  const warningStyling = {
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Alert style={warningStyling} 
        severity="warning" 
        open={open}
        onClick={handleClose}
        onClose={closeWarning}
      >
        {message}
      </Alert>
    </div>
  );
};

export default WarningMessage;
