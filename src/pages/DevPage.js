import React, { useReducer, useState } from "react";
import ckSDK from '@credit-key/creditkey-js-sdk';

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
import Display from "../components/Display";
import ApplyFlow from "../components/ApplyFlow";
import BadButton from "../components/BadButton";

import { ispayin4 } from '../lib/utils';

import "../styles/index.scss";

const sdk = ckSDK(process.env.REACT_APP_PUBLIC_KEY, process.env.REACT_APP_ENV);

const initialState = {
  cart: [
    new sdk.helper.cart_item({ price: '1000.00' }),
    new sdk.helper.cart_item({ price: '200.00' })
  ],
  email_override: "",
  phone: makePhoneNumber(),
  username: process.env.REACT_APP_USERNAME,
  redirect: true
};

function DevPage() {
  const [fico, setFico] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [applyFlow, setApplyFlow] = useState("Redirect Apply Now");

  let handleFlow = (value) => {
    setApplyFlow(value)
  };

  const applyFlows = [{
    label: 'Redirect Apply Now',
    dom: <Display
      {...state}
      conditions={{
        apply: true
      }}
    />
  }, {
    label: 'Pay in 4 Apply Now',
    dom: <Display
      {...state}
      conditions={{
        apply: true,
        pi4: true
      }}
    />
  }, {
    label: 'Modal Apply Now',
    dom: <Display
      {...state}
      conditions={{
        apply: true,
        redirect: false
      }}
    />
  }, {
    label: 'Cart Page PDP',
    dom: <Display
      {...state}
      conditions={{
        apply: true,
        template: 'standard_cart'
      }}
    />
  }, {
    label: 'VIP Apply Now',
    dom: <Display
      {...state}
      conditions={{ vip: true }}
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
                onChange={() => dispatch({ type: 'UPDATE_REDIRECT', redirect: !state.redirect })}
                checked={state.redirect}
                value={state.redirect}
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
              {/*<Pricing cart={state.cart} dispatch={dispatch} />*/}
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
                conditions={{ fico: fico, pi4: ispayin4() }}
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
              config={{ fico: 500 }}
              icon={faSkullCrossbones}
              label="Checkout with low FICO"
            />
            <BadButton
              {...state}
              config={{ equifax: "trades_and_collections" }}
              icon={faSkullCrossbones}
              label="Checkout with Collections and too few trades"
            />
            <BadButton
              {...state}
              config={{ equifax: "collections" }}
              icon={faSkullCrossbones}
              label="Checkout with Active Collections"
            />
            <BadButton
              {...state}
              config={{ fico: 500, equifax: "trades_and_collections" }}
              icon={faSkullCrossbones}
              label="Checkout with Collections and too few trades and Low FICO"
            />
            <BadButton
              {...state}
              config={{ equifax: "revolving" }}
              icon={faSkullCrossbones}
              label="Checkout with Low Revolving Credit"
            />
            <BadButton
              {...state}
              config={{ lexis: "bvi" }}
              icon={faPencilAlt}
              label="Checkout as Pending"
            />
            <BadButton
              {...state}
              config={{ equifax: "frozen" }}
              icon={faIcicles}
              label="Checkout with Frozen Credit Report"
            />
            <BadButton
              {...state}
              config={{ equifax: "fraud" }}
              icon={faSadTear}
              label="Checkout with Fraud Alert"
            />
            <BadButton
              {...state}
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
