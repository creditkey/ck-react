import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Email(props) {
  
  const [email, setEmail] = useState("")

  // const updateEmail = value => props.dispatch({
  //   type: 'UPDATE_EMAIL',
  //   email: value
  // });
  const updateEmail = value => {
    setEmail(value)
    props.dispatch({
        type: 'UPDATE_EMAIL',
        email: email
      });
  };

  return (
    <div className="field">
      <p className="control has-icons-left">

        <input
          className="input"
          type="text"
          name="email_override"
          id="email_override"
          placeholder="Email Override"
          onChange={e => updateEmail(e.target.value)}
          value={email} />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </p>
    </div>
  )
}
