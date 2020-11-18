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
import BadButton from "../components/BadButton";

const initialState = {
  cart: [new ck.CartItem("1", "Test Product", 1000, "1-TP", 1)],
  email_override: "",
  phone: makePhoneNumber(),
  username: "egoodman",
};

function HomePage() {
  const [fico, setFico] = useState();
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1 className="title has-text-centered" style={{ margin: "10px 0 0 0" }}>
        <img src="ck-mark.svg" style={{ verticalAlign: "middle" }} alt="CK Logo" /> CK React
        Test App
      </h1>

      <hr />

      <div className="container">
        <h1 className="subtitle">Override Options</h1>
        <div className="columns">
          <div className="column">
            <Username dispatch={dispatch} username={state.username} />
          </div>
          <div className="column">
            <Email dispatch={dispatch} email={state.email_override} />
          </div>
          <div className="column">
            <Pricing cart={state.cart} dispatch={dispatch} />
          </div>
        </div>

        <hr />

        <h1 className="subtitle">Standard Checkout &amp; Apply Now</h1>
        <div className="columns">
          <div className="column" style={{ borderRight: "1px solid #eeeeee" }}>
            <div className="tabs">
              <ul>
                <li className={!fico ? "is-active" : undefined}>
                  <a href="?tier1" onClick={(e) => {
                    e.preventDefault();
                    setFico(null);
                  }}>Tier 1</a>
                </li>
                <li className={fico === 651 ? "is-active" : undefined}>
                  <a href="?tier2" onClick={(e) => {
                    e.preventDefault();
                    setFico(651);
                  }}>Tier 2</a>
                </li>
                <li className={fico === 601 ? "is-active" : undefined}>
                  <a href="?tier3" onClick={(e) => {
                    e.preventDefault();
                    setFico(601);
                  }}>Tier 3</a>
                </li>
              </ul>
            </div>

            <p>
              <input
                type="checkbox"
                onChange={() => setRedirect(!redirect)}
                checked={redirect}
                value={redirect}
              />{" "}
              Use Redirect
            </p>

            <Display
              {...state}
              conditions={{ fico: fico }}
              redirect={redirect}
            />
          </div>
          <div className="column">
            <div className="has-text-weight-semibold">Apply Now</div>
            <Display
              {...state}
              conditions={{ apply: true }}
              config={{
                type: "pdp",
              }}
            />
            <hr />
            <div className="has-text-weight-semibold">
              Alternative Apply Now
            </div>
            <Display
              {...state}
              conditions={{ apply: true }}
              config={{
                type: "pdp",
                display: "text",
                size: "special",
              }}
            />
            <hr/>
              <div className="has-text-weight-semibold">Modal Apply Now</div>
              <Display 
                {...state}
                conditions={{ apply: true }}
                config={{
                  type: 'modal-pdp'
                }} />
          </div>
        </div>

        <hr />

        <h1 className="subtitle">Pending and Decline Checkouts</h1>
        <div className="columns">
          <div className="column is-one-third">
            <BadButton
              {...state}
              config={{ fico: 500 }}
              icon={faSkullCrossbones}
              label="Checkout with low FICO"
            />
          </div>
          <div className="column is-one-third">
            <BadButton
              {...state}
              config={{ lexis: "bvi" }}
              icon={faPencilAlt}
              label="Checkout as Pending"
            />
          </div>
          <div className="column">
            <BadButton
              {...state}
              config={{ equifax: "frozen" }}
              icon={faIcicles}
              label="Checkout with Frozen Credit Report"
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <BadButton
              {...state}
              config={{ equifax: "collections" }}
              icon={faSkullCrossbones}
              label="Checkout with Active Collections"
            />
          </div>
          <div className="column is-one-third">
            <BadButton
              {...state}
              config={{ equifax: "revolving" }}
              icon={faSkullCrossbones}
              label="Checkout with Low Revolving Credit"
            />
          </div>
          <div className="column">
            <BadButton
              {...state}
              config={{ equifax: "fraud" }}
              icon={faSadTear}
              label="Checkout with Fraud Alert"
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <BadButton
              {...state}
              config={{ equifax: "trades_and_collections" }}
              icon={faSkullCrossbones}
              label="Checkout with Collections and too few trades"
            />
          </div>
          <div className="column is-half">
            <BadButton
              {...state}
              config={{ fico: 500, equifax: "trades_and_collections" }}
              icon={faSkullCrossbones}
              label="Checkout with Collections and too few trades and Low FICO"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
