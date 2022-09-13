import ck from "creditkey-js";
import { faker } from '@faker-js/faker';
import { client, pi4Client, addEmailTestingConditions } from "./utils";

export default function LoadCheckout(conditions = {}, state, charges) {
  let date = new Date();
  const remoteId = date.getTime();
  const customerId = date.getTime();
  const returnUrl = window.location.origin + "/store/credit-key/success?id=%CKKEY%";
  const cancelUrl = window.location.origin + "/store/credit-key/cancelled";
  const orderCompleteUrl = window.location.origin + "/store/credit-key/success?id=%CKKEY%";

  let sdkClient;
  let address;

  conditions.pi4 ? sdkClient = pi4Client : sdkClient = client;

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

  const mismatchedAddress1 = new ck.Address(
    'Test',
    'User',
    'Test Company',
    state.email_override !== "" ? state.email_override : email,
    faker.address.streetAddress(true),
    faker.address.secondaryAddress(),
    faker.address.city(),
    faker.address.stateAbbr(),
    faker.address.zipCode(),
    state.phone
  );

  const mismatchedAddress2 = new ck.Address(
    'Test',
    'User',
    'Test Company',
    state.email_override !== "" ? state.email_override : email,
    faker.address.streetAddress(true),
    faker.address.secondaryAddress(),
    faker.address.city(),
    faker.address.stateAbbr(),
    faker.address.zipCode(),
    state.phone
  );

  state.address ? address = state.address : address = defaultAddressData;

  sdkClient
    .begin_checkout(
      state.cart,
      conditions.address_mismatch ? mismatchedAddress1 : address,
      conditions.address_mismatch ? mismatchedAddress2 : address,
      charges,
      remoteId,
      customerId,
      returnUrl,
      cancelUrl,
      orderCompleteUrl,
      state.redirect ? "redirect" : "modal"
    )
    .then((res) =>
      state.redirect
        ? (window.location = res.checkout_url)
        : ck.checkout(res.checkout_url)
    )
    .catch((err) => console.log(err));
}
