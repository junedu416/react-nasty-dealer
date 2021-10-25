import React from "react";

const WinAmount = ({ amount }) => {
  return (
    <>
      {amount >= 0 ? <p style={{ color: "#5AFF00", margin: "0"}}>${amount}</p> : <p style={{ color: "red" }}>${amount}</p>}
    </>
  );
};

export default WinAmount;
