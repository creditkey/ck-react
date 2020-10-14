import React from "react";

function Header() {
  return (
    <header className="header">
      <h1 className="title has-text-centered" style={{ margin: "10px 0 0 0" }}>
        <a href="/">
          <img className="logo" src="/ck-mark.svg" alt="CreditKey Logo" />
          CK React Demo
        </a>
      </h1>

      <hr />
    </header>
  );
}

export default Header;
