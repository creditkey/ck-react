import React from "react";

export default ({ items }) => {
  return (
    <div className="columns is-multiline">
      {items.map((item, index) => (
        <div key={index} className="column is-one-quarter">{item}</div>
      ))}
    </div>
  );
}
