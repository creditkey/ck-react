import React, { useEffect, useState } from 'react';
import ck from 'creditkey-js';
import { calcCharges, client } from '../lib/utils';
import loadModal from '../lib/load_modal';

export default function Display(props) {
  const [display, setDisplay] = useState();

  const config = props.config || {
    type: 'checkout',
    display: 'text',
    size: 'small'
  };

  const charges = calcCharges(props.cart)

  useEffect(() => {
    client.get_marketing_display(charges, config.type, config.display, config.size)
      .then(res => setDisplay(res));
  }, [props.cart]);

  return (
    <div 
      className="is-size-6 checkout" 
      onClick={() => !props.conditions.apply && loadModal(props.conditions, props, charges)} 
      dangerouslySetInnerHTML={ { __html: display } } />
  );
}
