import React, { useEffect, useState } from 'react';

import {
  chargesFromCart,
  launchApply,
  renderApply,
  launchCheckout,
  renderCheckout
} from '../lib/load_sdk';

export default function Display(props) {
  const [display, setDisplay] = useState();

  const isApply = () => props.conditions.apply;

  useEffect(() => {
    if (isApply()) {
      setDisplay(
        renderApply(
          chargesFromCart(props.cart).grand_total, 
          props.redirect,
          props.conditions.template, 
          props.conditions.pi4
        )
      );
    }  else {
      setDisplay(renderCheckout());
    }

  }, [props]);

  const onClick = () => {
    if (props.conditions.vip) window.location.href = process.env.REACT_APP_VIP_UI;

    return !isApply() && launchCheckout(props);
  }

  return (
    <div
      className="is-size-6 checkout"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: display }} />
  );
}
