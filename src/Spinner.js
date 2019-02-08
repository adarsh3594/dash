import React from "react";

export default function Spinner() {
  return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
