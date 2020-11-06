import ck from "creditkey-js";
import { client, addEmailTestingConditions } from "./utils";

export default function LoadModal(conditions = {}, state, charges) {
  let date = new Date();
  const remoteId = date.getTime();
  const customerId = date.getTime();
  const returnUrl =
    "http://localhost:3000/credit-key/success?id=%CKKEY%&storeId=2";
  const cancelUrl = "http://localhost:3000/credit-key/cancelled";

  const email = addEmailTestingConditions(
    state.username,
    "creditkey.com",
    conditions
  );
  const address = new ck.Address(
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
  );

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
      "modal"
    )
    .then((res) =>
      state.redirect
        ? (window.location = res.checkout_url)
        : ck.checkout(res.checkout_url)
    )
    .catch((err) => console.log(err));
}
