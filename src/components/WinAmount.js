import React from "react";

const WinAmount = ({ amount }) => {
  return (
    <>
      {amount < 0 ? <p style={{ color: "red", margin: "0" }}>-${Math.abs(amount).toLocaleString()}</p> : amount > 0 ? <p style={{ color: "#5AFF00", margin: "0"}}>${amount.toLocaleString()}</p> : <p style={{margin: '0'}}>${amount.toLocaleString()}</p> }
    </>
  );
};

export default WinAmount;
