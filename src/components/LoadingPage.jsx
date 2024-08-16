import React from "react";
const LoadingPage = () => {
  return (
    <div
      className="loading-page d-flex justify-content-center align-items-center"
      data-testid="loading-page"
    >
      <div className="fs-vl fw-m d-flex flex-wrap justify-content-center ">
        <span className="me-1" style={{ color: "#2da5da" }}>
          Welcome to
        </span>
        <span className="me-1" style={{ color: "#fec810" }}>
          most
        </span>
        <span className="me-1" style={{ color: "#213755" }}>
          ❤ed
        </span>
        <span className="me-1" style={{ color: "#ed7524" }}>
          Community
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
