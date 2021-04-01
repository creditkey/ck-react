import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function ApplyFlow(props) {
  const [applyFlow, setApplyFlow] = useState(props.applyFlow)

  return (
    <div className="field">
      <p className="control has-icons-left">

        <select
          className="select"
          name="apply_flow"
          id="apply_flow"
          value={applyFlow}
          onChange={e => setApplyFlow(e.target.value)}
        >
          <option>Apply Now</option>
          <option>Text Apply Now</option>
          <option>Alternative Apply Now</option>
          <option>Modal Apply Now</option>
          <option>Modal Apply Now for Cart Page</option>
        </select>

        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faCheckCircle} />
        </span>
      </p>
    </div>
  )
}
