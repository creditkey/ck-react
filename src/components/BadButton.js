import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { calcCharges } from '../lib/utils';
import loadCheckout from '../lib/load_checkout';

export default function BadButton(props) {
  return (
    <button className="button is-medium is-fullwidth is-danger is-outlined" onClick={() => loadCheckout(props.config, props, calcCharges(props.cart))}>
      <FontAwesomeIcon icon={props.icon} />&nbsp;<span>{props.label}</span>
    </button>
  );
}
