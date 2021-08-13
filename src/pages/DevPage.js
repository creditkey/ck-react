import React, { useReducer, useState } from "react";
import ck from "creditkey-js";
import {
  faSadTear,
  faSkullCrossbones,
  faPencilAlt,
  faIcicles,
} from "@fortawesome/free-solid-svg-icons";
import { makePhoneNumber } from "../lib/utils";
import reducer from "../reducers/admin";
import Username from "../components/Username";
import Email from "../components/Email";
import Pricing from "../components/Pricing";
import Display from "../components/Display";
import ApplyFlow from "../components/ApplyFlow";
import BadButton from "../components/BadButton";

import "../styles/index.scss";

const initialState = {
  cart: [new ck.CartItem("1", "Test Product", 1000, "1-TP", 1)],
  email_override: "",
  phone: makePhoneNumber(),
  username: process.env.REACT_APP_USERNAME,
};

function DevPage() {
  const [fico, setFico] = useState();
  const [redirect, setRedirect] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [applyFlow, setApplyFlow] = useState("Apply Now");

  let handleFlow = (value) => {
    setApplyFlow(value)
  };

  const applyFlows = [{
    label: 'Apply Now',
    dom: <Display
      {...state}
      conditions={{ apply: true }}
      config={{
        type: "pdp",
      }}
    />
  }, {
    label: 'Text Apply Now',
    dom: <Display
      {...state}
      conditions={{ apply: true }}
      config={{
        type: "pdp",
        display: "text",
      }}
    />
  }, {
    label: 'Alternative Apply Now',
    dom: <Display
      {...state}
      conditions={{ apply: true }}
      config={{
        type: "pdp",
        display: "text",
        size: "special",
      }}
    />
  }, {
    label: 'Modal Apply Now',
    dom: <Display
      {...state}
      conditions={{ apply: true }}
      config={{
        type: "pdp",
        display: "button",
        size: "medium",
        extra: "static"
      }}
    />
  }, {
    label: 'Modal Apply Now for Cart Page',
    dom: <Display
      {...state}
      conditions={{ apply: true }}
      config={{
        type: "pdp",
        display: "button",
        size: "medium",
        extra: "static",
        cart: true
      }}
    />
  }, {
    label: 'New PDP',
    dom: <Display
      {...state}
      conditions={{ apply: true }}
      config={{
        type: "pdp",
        extra: "new"
      }}
    />
  }, {
    label: 'Cart Page PDP',
    dom: <Display
      {...state}
      conditions={{ apply: true }}
      config={{
        type: "cart-promo",
        extra: "cart"
      }}
    />
  }
  ];

  const renderDisplay = () => {
    const display = applyFlows.find(f => f.label === applyFlow);
    return <>
      <div className="has-text-weight-semibold">{display.label}</div>
      {display.dom}
    </>
  }

  const hitAPIGateway = () => {
    fetch(`https://c2rxvcaph7.execute-api.us-west-2.amazonaws.com/staging/demo-success?ckkey=1`, {
      method: 'GET',
      mode: 'cors'
    })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    });
  }

  return (
    <>
      <div className="App">
        <h1 className="title has-text-centered" style={{ margin: "10px 0 0 0" }}>
          <img
            alt="CreditKey"
            src="ck-mark.svg"
            style={{ verticalAlign: "middle" }}
          />{" "}
        CK React Test App
        </h1>

        <hr />
        <div className="container">
          <h1 className="subtitle">Override Options</h1>
          <div className="columns is-vcentered">
            <div className="column is-narrow">
              <input
                type="checkbox"
                id="use_redirect"
                onChange={() => setRedirect(!redirect)}
                checked={redirect}
                value={redirect}
              />
              <label htmlFor="use_redirect">Use Redirect</label>
            </div>
            <div className="column">
              <Username dispatch={dispatch} username={state.username} />
            </div>
            <div className="column">
              <Email dispatch={dispatch} email={state.email_override} />
            </div>
            <div className="column">
              <Pricing cart={state.cart} dispatch={dispatch} />
            </div>
            <div className="column">
              <ApplyFlow applyFlow={applyFlow} setApplyFlow={setApplyFlow} handleFlow={handleFlow} />
            </div>
          </div>
          <hr />
          <h1 className="subtitle">Standard Checkout &amp; Apply Now</h1>
          <div className="columns">
            <div className="column" style={{ borderRight: "1px solid #eeeeee" }}>
              <div className="tabs"
              style={{ marginRight: "35px" }}>
                <ul>
                  <li className={!fico ? "is-active" : undefined}>
                    <a onClick={() => setFico(null)}>Tier 1</a>
                  </li>
                  <li className={fico === 681 ? "is-active" : undefined}>
                    <a onClick={() => setFico(681)}>Tier 2</a>
                  </li>
                  <li className={fico === 641 ? "is-active" : undefined}>
                    <a onClick={() => setFico(641)}>Tier 3</a>
                  </li>
                  <li className={fico === 601 ? "is-active" : undefined}>
                    <a onClick={() => setFico(601)}>Tier 4</a>
                  </li>
                </ul>
              </div>
              
              <Display
                {...state}
                conditions={{ fico: fico }}
                redirect={redirect}
              />
            </div>
            <div 
              className="column"
              style={{ marginLeft: "25px" }}>
                {renderDisplay()}
            </div>
          </div>
        </div>

        <hr />
        <div className="container">
          <div className="panel is-danger">
            <p className="panel-heading">
              Pending and Decline
            </p>
            <BadButton
              {...state}
              redirect={redirect}
              config={{ fico: 500 }}
              icon={faSkullCrossbones}
              label="Checkout with low FICO"
            />
            <BadButton
              {...state}
              redirect={redirect}
              config={{ equifax: "trades_and_collections" }}
              icon={faSkullCrossbones}
              label="Checkout with Collections and too few trades"
            />
            <BadButton
              {...state}
              redirect={redirect}
              config={{ equifax: "collections" }}
              icon={faSkullCrossbones}
              label="Checkout with Active Collections"
            />
            <BadButton
              {...state}
              redirect={redirect}
              config={{ fico: 500, equifax: "trades_and_collections" }}
              icon={faSkullCrossbones}
              label="Checkout with Collections and too few trades and Low FICO"
            />
            <BadButton
              {...state}
              redirect={redirect}
              config={{ equifax: "revolving" }}
              icon={faSkullCrossbones}
              label="Checkout with Low Revolving Credit"
            />
            <BadButton
              {...state}
              redirect={redirect}
              config={{ lexis: "bvi" }}
              icon={faPencilAlt}
              label="Checkout as Pending"
            />
            <BadButton
              {...state}
              redirect={redirect}
              config={{ equifax: "frozen" }}
              icon={faIcicles}
              label="Checkout with Frozen Credit Report"
            />
            <BadButton
              {...state}
              redirect={redirect}
              config={{ equifax: "fraud" }}
              icon={faSadTear}
              label="Checkout with Fraud Alert"
            />
            <BadButton
              {...state}
              redirect={redirect}
              config={{ middesk: 'fail', lexis: 'bvi' }}
              icon={faSadTear}
              label="Checkout with Middesk Failure"
            />
          </div>

          <button className="button is-large" onClick={hitAPIGateway}>Send Test AWS API Gateway Request</button>
        </div>
      </div>
    </>
  );
}

export default DevPage;
