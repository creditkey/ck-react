import ckSDK from '@credit-key/creditkey-js-sdk';
import { addEmailTestingConditions } from './utils';

const sdk = ckSDK(process.env.REACT_APP_PUBLIC_KEY, process.env.REACT_APP_ENV);

function renderCheckout() {
  return sdk.display.checkout();
}

function renderApply() {
  return sdk.display.apply();
}

function launchCheckout(props /*conditions = {}, state, charges*/) {
  let date = new Date();
  const remoteId = date.getTime();
  const customerId = date.getTime();
  const returnUrl = window.location.origin + "/store/credit-key/success?id=%CKKEY%";
  const cancelUrl = window.location.origin + "/store/credit-key/cancelled";
  const orderCompleteUrl = window.location.origin + "/store/credit-key/success?id=%CKKEY%";
  const conditions = props.conditions;
  const username = props.username;
  const redirect = props.redirect;

  let address;

  const email = addEmailTestingConditions(
    props.username,
    "creditkey.com",
    props.conditions
  );

  const defaultAddressData = new sdk.helper.address({
    first_name: "Test",
    last_name: "User",
    company_name: "Test Company",
    email: props.email_override !== "" ? props.email_override : email,
    address1: "1 Test Rd",
    city: "Testerville",
    state: "CA",
    zip: "11111",
    phone_number: props.phone
  })

  props.address ? address = props.address : address = defaultAddressData;
  const charges = new sdk.helper.charges(props.cart);

  sdk
    .async
    .checkout(
      props.cart,
      address,
      address,
      charges,
      remoteId,
      customerId,
      returnUrl,
      cancelUrl,
      orderCompleteUrl,
      props.redirect ? "redirect" : "modal"
    )
    .then(res => sdk.action.checkout(res.data.checkout_url, props.redirect ? 'redirect' : 'modal'))
    .catch(err => console.log(err));
}

function launchApply(redirect) {
  return sdk
    .async
    .apply(redirect ? 'redirect' : 'modal');
}

export {
  launchApply,
  launchCheckout,
  renderApply,
  renderCheckout
}
