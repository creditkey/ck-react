import React, { useEffect, useState } from 'react';
import { calcCharges, client } from '../lib/utils';
import loadCheckout from '../lib/load_checkout';

export default function Display(props) {
  const [display, setDisplay] = useState();

  const config = props.config || {
    type: 'checkout',
    display: 'text',
    size: 'small',
    extra: 'none'
  };

  const charges = calcCharges(props.cart)

  const onClick = () => {
    if (props.conditions.apply && config.extra === 'none') return false;
    if (props.conditions.apply && config.extra === 'static' && config.cart) return client.enhanced_pdp_modal(charges, 'cart');
    if (props.conditions.apply && config.extra === 'static') return client.enhanced_pdp_modal(charges);

    return loadCheckout(props.conditions, props, charges);
  }

  useEffect(() => {
    if (config.extra === 'new') {
      console.log(charges)
      setDisplay(client.get_pdp_display(charges));
    } else{
      client
        .get_marketing_display(charges, config.type, config.display, config.size, config.extra)
        .then((res) => setDisplay(res));
    }
  }, [charges, props.cart, config]);

  return (
    <div 
      className="is-size-6 checkout" 
      onClick={onClick} 
      dangerouslySetInnerHTML={ { __html: display } } />
  );
}
