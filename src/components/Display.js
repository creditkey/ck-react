import React, { useEffect, useState } from 'react';
import { calcCharges, client, pi4Client } from '../lib/utils';
import loadCheckout from '../lib/load_checkout';

export default function Display(props) {
  const [display, setDisplay] = useState();

  const config = props.config || {
    type: 'checkout',
    display: 'text',
    size: 'small',
    extra: 'none'
  };

  const sdkClient = props.conditions.pi4 ? pi4Client : client;
  const charges = calcCharges(props.cart)
  
  const onClick = () => {
    if (props.conditions.vip) window.location.href = process.env.REACT_APP_VIP_UI;
    if (props.conditions.apply && config.extra === 'none') return false;
    if (props.conditions.apply && config.extra === 'static' && config.cart) return sdkClient.enhanced_pdp_modal(charges, 'cart');
    if (props.conditions.apply && config.extra === 'static') return sdkClient.enhanced_pdp_modal(charges);

    return loadCheckout(props.conditions, props, charges);
  }

  useEffect(() => {
    switch(config.extra) {
      case "new":
        return setDisplay(sdkClient.get_pdp_display(charges));
      case "cart":
        return setDisplay(sdkClient.get_cart_display(charges, props.desktop, props.mobile));
      case "apply":
        return setDisplay(sdkClient.get_apply_now('modal', charges));
      default:
        sdkClient.get_marketing_display(charges, config.type, config.display, config.size, config.extra)
          .then((res) => setDisplay(res));
    }
  }, [charges, props.cart, config, props.desktop, props.mobile]);

  return (
    <div
      className="is-size-6 checkout"
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: display }} />
  );
}
