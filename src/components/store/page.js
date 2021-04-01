import React from "react";

export default ({ title, right, children }) => {
  return (
    <div className="container">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            {title && <h1 className="title is-capitalized">{title}</h1>}
          </div>
        </div>
        <div className="level-right">
          {right}
        </div>
      </div>
      <br />
      {children}
    </div>
  );
};
