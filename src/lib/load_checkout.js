import ck from "creditkey-js";
import { client, addEmailTestingConditions } from "./utils";

export default function LoadCheckout(conditions = {}, state, charges) {
  let date = new Date();
  const remoteId = date.getTime();
  const customerId = date.getTime();
  const returnUrl = "http://localhost:3000/store/credit-key/success?id=%CKKEY%&storeId=2";
  const cancelUrl = "http://localhost:3000/store/credit-key/cancelled";

  let address;

  const email = addEmailTestingConditions(
    state.username,
    "creditkey.com",
    conditions
  );

  const defaultAddressData = new ck.Address(
    "Test",
    "User",
    "Test Company",
    state.email_override !== "" ? state.email_override : email,
    "1 Test Rd",
    "",
    "Testerville",
    "CA",
    "11111",
    state.phone
  )

  state.address ? address = state.address : address = defaultAddressData;

  client
    .begin_checkout(
      state.cart,
      address,
      address,
      charges,
      remoteId,
      customerId,
      returnUrl,
      cancelUrl,
      state.redirect ? "redirect" : "modal"
    )
    .then((res) =>
      state.redirect
        ? (window.location = res.checkout_url)
        : ck.checkout(res.checkout_url)
    )
    .catch((err) => console.log(err));
}
