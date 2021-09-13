import ck from 'creditkey-js';

const publicKeys = {
  development: 'creditkeydev_2822baea77774929979f1e5964dd18b6',
  staging: 'creditkeytest_6d8e5758033846b4995993dd74dda57c',
  production: 'creditkeysamplestore_2d3170af046347cdaf0171e06c08ca77'
}

function setupCkClient() {
  return new ck.Client(publicKeys[process.env.REACT_APP_ENV], process.env.REACT_APP_ENV);
}

export const client  = setupCkClient();

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
