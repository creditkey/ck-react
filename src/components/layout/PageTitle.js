import React from "react";

function PageTitle({ title }) {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
        </div>
      </div>
    </section>
  );
}

export default PageTitle;
