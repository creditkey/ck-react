import React from "react";

function Content({ children }) {
  return (
    <section className="content">
      <div className="container">{children}</div>
    </section>
  );
}

export default Content;
