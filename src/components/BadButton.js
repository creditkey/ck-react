import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { calcCharges } from '../lib/utils';
import loadModal from '../lib/load_modal';

export default function BadButton(props) {
  return (
    <a className="button is-medium is-fullwidth is-danger is-outlined" onClick={() => loadModal(props.config, props, calcCharges(props.cart))}>
      <FontAwesomeIcon icon={props.icon} />&nbsp;<span>{props.label}</span>
    </a>
  );
}
