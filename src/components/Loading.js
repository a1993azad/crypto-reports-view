import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ height }) {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height }}
    >
      <Spinner animation="border" />
    </div>
  );
}

export default Loading;
