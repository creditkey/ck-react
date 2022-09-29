import React, { useEffect, useState } from 'react';

import { 
  launchApply, 
  launchCheckout,
  renderCheckout
} from '../lib/load_sdk';

export default function Display(props) {
  const [display, setDisplay] = useState();

  //const sdkClient = props.conditions.pi4 ? pi4Client : client;
  //const charges = calcCharges(props.cart)

  const onClick = () => {
    if (props.conditions.vip) window.location.href = process.env.REACT_APP_VIP_UI;
    //if (props.conditions.apply && config.extra === 'none') return false; // ??

    /*if (props.conditions.apply && config.extra === 'static' && config.cart) return sdkClient.enhanced_pdp_modal(charges, 'cart');*/
    /*if (props.conditions.apply && config.extra === 'static') return sdkClient.enhanced_pdp_modal(charges);*/

    //if (props.conditions.apply && config.extra === 'static') return launchApply(props.cart, config.cart);
    return launchCheckout(props);
  }

  /*useEffect(() => {*/
    /*switch(config.extra) {*/
      /*case "new":*/
        /*return setDisplay(sdkClient.get_pdp_display(charges));*/
      /*case "cart":*/
        /*return setDisplay(sdkClient.get_cart_display(charges, props.desktop, props.mobile));*/
      /*case "apply":*/
        /*return setDisplay(sdkClient.get_apply_now('modal'));*/
      /*default:*/
        /*sdkClient.get_marketing_display(charges, config.type, config.display, config.size, config.extra)*/
          /*.then((res) => setDisplay(res));*/
    /*}*/
  /*}, [charges, props.cart, config, props.desktop, props.mobile]);*/

  return (
    <div
      className="is-size-6 checkout"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: renderCheckout() }} />
  );
}
