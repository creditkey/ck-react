import ck from 'creditkey-js';

function setupCkClient() {
  return new ck.Client(process.env.REACT_APP_PUBLIC_KEY, process.env.REACT_APP_ENV);
}

function setupPi4Client() {
  return new ck.Client(process.env.REACT_APP_PI4_PUBLIC_KEY, process.env.REACT_APP_ENV);
}

export const ispayin4 = () => {
  return window.location && window.location.hostname.indexOf('payin4') >= 0;
}

export const client = setupCkClient();
export const pi4Client = setupPi4Client();

export const makePhoneNumber = () => {
  let segment = (min, max) => (min + Math.random() * (max - min)).toFixed();

  return `+1 800 ${segment(2, 9)}${segment(0, 9)}${segment(2, 9)} ${segment(1000, 1900)}`;
}

export const addEmailTestingConditions = (username, domain, conditions) => {
  let addons = '';
  let date = new Date();

  if (Object.keys(conditions).length >= 1) {
    for (let [key, value] of Object.entries(conditions)) {
      if (value) addons += '+' + key + '+' + value;
    }
  }

  return username + '+' + date.getTime() + addons + '@' + domain;
}

export const calcCharges = cart => {
  let charges =  new ck.Charges(0, 100, 5.50, 0, 105.50);

  cart.forEach(c => {
    charges.data.total += c.data.price;
    charges.data.grand_total += c.data.price;
  });

  return charges;
}
