import ck from 'creditkey-js';

const d = Symbol('development');
const s = Symbol('staging');
const p = Symbol('production');

const platform = {
  [d]: { key: 'creditkeydev_2822baea77774929979f1e5964dd18b6' },
  [s]: { key: 'creditkeytest_6d8e5758033846b4995993dd74dda57c' },
  [p]: { key: 'creditkeysamplestore_2d3170af046347cdaf0171e06c08ca77' }
}

function setupCkClient(env = d) {
  if (window.location.hostname !== 'localhost') env = s;
  return new ck.Client(platform[env].key, env.description);
}

export const client  = setupCkClient(s);

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
