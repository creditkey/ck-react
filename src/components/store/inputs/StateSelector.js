import React from "react";

export default function StateSelector(props) {
  return (
    <div className="field field--required field--show-floating-label field--third">
      <div className="field__input-wrapper field__input-wrapper--select">
        <label
          className="field__label field__label--visible"
          htmlFor="checkout_shipping_address_province"
        >
          State
        </label>
        <select
          placeholder="State"
          className="field__input field__input--select"
          name="checkout[shipping_address][province]"
          id="checkout_shipping_address_province"
          onChange={props.onChange}
          value={props.selected}
        >
          <option disabled="">State</option>
          <option data-alternate-values='["Alabama"]' value="AL">
            Alabama
          </option>
          <option data-alternate-values='["Alaska"]' value="AK">
            Alaska
          </option>
          <option data-alternate-values='["American Samoa"]' value="AS">
            American Samoa
          </option>
          <option data-alternate-values='["Arizona"]' value="AZ">
            Arizona
          </option>
          <option data-alternate-values='["Arkansas"]' value="AR">
            Arkansas
          </option>
          <option data-alternate-values='["California"]' value="CA">
            California
          </option>
          <option data-alternate-values='["Colorado"]' value="CO">
            Colorado
          </option>
          <option data-alternate-values='["Connecticut"]' value="CT">
            Connecticut
          </option>
          <option data-alternate-values='["Delaware"]' value="DE">
            Delaware
          </option>
          <option data-alternate-values='["District of Columbia"]' value="DC">
            District of Columbia
          </option>
          <option
            data-alternate-values='["Federated States of Micronesia"]'
            value="FM"
          >
            Federated States of Micronesia
          </option>
          <option data-alternate-values='["Florida"]' value="FL">
            Florida
          </option>
          <option data-alternate-values='["Georgia"]' value="GA">
            Georgia
          </option>
          <option data-alternate-values='["Guam"]' value="GU">
            Guam
          </option>
          <option data-alternate-values='["Hawaii"]' value="HI">
            Hawaii
          </option>
          <option data-alternate-values='["Idaho"]' value="ID">
            Idaho
          </option>
          <option data-alternate-values='["Illinois"]' value="IL">
            Illinois
          </option>
          <option data-alternate-values='["Indiana"]' value="IN">
            Indiana
          </option>
          <option data-alternate-values='["Iowa"]' value="IA">
            Iowa
          </option>
          <option data-alternate-values='["Kansas"]' value="KS">
            Kansas
          </option>
          <option data-alternate-values='["Kentucky"]' value="KY">
            Kentucky
          </option>
          <option data-alternate-values='["Louisiana"]' value="LA">
            Louisiana
          </option>
          <option data-alternate-values='["Maine"]' value="ME">
            Maine
          </option>
          <option data-alternate-values='["Marshall Islands"]' value="MH">
            Marshall Islands
          </option>
          <option data-alternate-values='["Maryland"]' value="MD">
            Maryland
          </option>
          <option data-alternate-values='["Massachusetts"]' value="MA">
            Massachusetts
          </option>
          <option data-alternate-values='["Michigan"]' value="MI">
            Michigan
          </option>
          <option data-alternate-values='["Minnesota"]' value="MN">
            Minnesota
          </option>
          <option data-alternate-values='["Mississippi"]' value="MS">
            Mississippi
          </option>
          <option data-alternate-values='["Missouri"]' value="MO">
            Missouri
          </option>
          <option data-alternate-values='["Montana"]' value="MT">
            Montana
          </option>
          <option data-alternate-values='["Nebraska"]' value="NE">
            Nebraska
          </option>
          <option data-alternate-values='["Nevada"]' value="NV">
            Nevada
          </option>
          <option data-alternate-values='["New Hampshire"]' value="NH">
            New Hampshire
          </option>
          <option data-alternate-values='["New Jersey"]' value="NJ">
            New Jersey
          </option>
          <option data-alternate-values='["New Mexico"]' value="NM">
            New Mexico
          </option>
          <option data-alternate-values='["New York"]' value="NY">
            New York
          </option>
          <option data-alternate-values='["North Carolina"]' value="NC">
            North Carolina
          </option>
          <option data-alternate-values='["North Dakota"]' value="ND">
            North Dakota
          </option>
          <option
            data-alternate-values='["Northern Mariana Islands"]'
            value="MP"
          >
            Northern Mariana Islands
          </option>
          <option data-alternate-values='["Ohio"]' value="OH">
            Ohio
          </option>
          <option data-alternate-values='["Oklahoma"]' value="OK">
            Oklahoma
          </option>
          <option data-alternate-values='["Oregon"]' value="OR">
            Oregon
          </option>
          <option data-alternate-values='["Palau"]' value="PW">
            Palau
          </option>
          <option data-alternate-values='["Pennsylvania"]' value="PA">
            Pennsylvania
          </option>
          <option data-alternate-values='["Puerto Rico"]' value="PR">
            Puerto Rico
          </option>
          <option data-alternate-values='["Rhode Island"]' value="RI">
            Rhode Island
          </option>
          <option data-alternate-values='["South Carolina"]' value="SC">
            South Carolina
          </option>
          <option data-alternate-values='["South Dakota"]' value="SD">
            South Dakota
          </option>
          <option data-alternate-values='["Tennessee"]' value="TN">
            Tennessee
          </option>
          <option data-alternate-values='["Texas"]' value="TX">
            Texas
          </option>
          <option data-alternate-values='["Utah"]' value="UT">
            Utah
          </option>
          <option data-alternate-values='["Vermont"]' value="VT">
            Vermont
          </option>
          <option data-alternate-values='["Virgin Islands"]' value="VI">
            Virgin Islands
          </option>
          <option data-alternate-values='["Virginia"]' value="VA">
            Virginia
          </option>
          <option data-alternate-values='["Washington"]' value="WA">
            Washington
          </option>
          <option data-alternate-values='["West Virginia"]' value="WV">
            West Virginia
          </option>
          <option data-alternate-values='["Wisconsin"]' value="WI">
            Wisconsin
          </option>
          <option data-alternate-values='["Wyoming"]' value="WY">
            Wyoming
          </option>
          <option data-alternate-values='["Armed Forces Americas"]' value="AA">
            Armed Forces Americas
          </option>
          <option data-alternate-values='["Armed Forces Europe"]' value="AE">
            Armed Forces Europe
          </option>
          <option data-alternate-values='["Armed Forces Pacific"]' value="AP">
            Armed Forces Pacific
          </option>
        </select>
      </div>
    </div>
  );
}
