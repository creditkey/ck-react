import React from 'react';
import ckSDK from '@credit-key/creditkey-js-sdk';

export default function SpikePage() {
  const creditkeySDK = ckSDK('test_fb43784hf234foh', 'development');

  /*const beginCreditKeyCheckout = () => {*/
    //return theirPrivateAPI.beginCheckoutWithCreditKey()
      //.then(res => creditkeySDK.checkout(res.checkout_url, 'redirect'))
      //.catch(err => console.log('something went wrong with Credit Key'));
  /*}*/

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: creditkeySDK.promoDisplay(100) }} />

      <button className="button" onClick={() => creditkeySDK.apply('redirect')}>Launch Apply Flow</button>
    </>
  );
}
