import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { calcCharges } from '../lib/utils';
import loadCheckout from '../lib/load_checkout';

export default function BadButton(props) {
  return (
    <a className="panel-block is-active" onClick={() => loadCheckout(props.config, props, calcCharges(props.cart))}>
      <span className="panel-icon">
        <FontAwesomeIcon icon={props.icon} />
      </span>
      {props.label}
    </a>
  );
}
