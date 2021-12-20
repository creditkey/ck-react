import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Email(props) {
  const updateEmail = value => {
    return props.dispatch({
        type: 'UPDATE_EMAIL',
        email: value.trim()
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
          value={props.email.trim()} />

        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </p>
    </div>
  )
}
