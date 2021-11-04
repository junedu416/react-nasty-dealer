import React from "react";
import Alert from "@mui/material/Alert";

const WarningMessage = ({ message, closeWarning }) => {
  const warningStyling = {
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div>
      <Alert style={warningStyling} severity="warning" onClose={closeWarning}>
        {message}
      </Alert>
    </div>
  );
};

export default WarningMessage;
