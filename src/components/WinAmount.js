import React from "react";

const WinAmount = ({ amount }) => {
  return (
    <>
      {amount < 0 ? <p style={{ color: "red", margin: "0" }}>-${Math.abs(amount)}</p> : amount > 0 ? <p style={{ color: "#5AFF00", margin: "0"}}>${amount}</p> : <p style={{margin: '0'}}>${amount}</p> }
    </>
  );
};

export default WinAmount;
