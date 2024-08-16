import React from "react";
const loading = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ fontWeight: "500" }}>loading...</p>
    </div>
  );
};

export default loading;
