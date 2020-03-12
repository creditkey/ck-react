import React from 'react';
import ck from 'creditkey-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones, faPencilAlt, faIcicles } from '@fortawesome/free-solid-svg-icons'
import Customer from './Customer';
import './App.css';
import 'bulma';

const cart = [new ck.CartItem('1', 'Test Product', 1000, '1-TP', 1)];
const charges = new ck.Charges(1000, 100, 5.50, 0, 1105.50);

function setupCkClient(host) {
  if (host === 'localhost') {
  return new ck.Client('creditkeydev_2822baea77774929979f1e5964dd18b6'); // development
  } else {
    return new ck.Client('creditkeytest_6d8e5758033846b4995993dd74dda57c', 'staging'); // staging
  }

  throw 'Unable to create Credit Key client, no host determined';
}

const client  = setupCkClient(window.location.hostname);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'egoodman',
      domain: 'creditkey.com',
      phone: this.makePhoneNumber(),
      display: false,
      checkout: '',
      checkout_button: '',
      marketing: '',
      marketing_button: ''
    }
  }

  componentDidMount() {
    if (window.location.hostname !== 'localhost') {
      this.setState({ username: 'activity', phone: '8443343636' });
    }

    this.isDisplayed()
      .then(res => this.setState({ display: res }))
      .then(res => this.display(charges, 'checkout', 'text', 'small'))
      .then(res => this.setState({ checkout: res }))
      .then(res => this.display(charges, 'pdp', 'text', 'special'))
      .then(res => this.setState({ marketing: res }))
      .then(res => this.display(charges, 'pdp', 'button', 'small'))
      .then(res => this.setState({ marketing_button: res }))
      .then(res => this.getCustomer(this.state.email, 1))
      .catch(err => console.log(err));
  }

  makePhoneNumber() {
    let segment = (min, max) => (min + Math.random() * (max - min)).toFixed();

    return `+1 800 ${segment(2, 9)}${segment(0, 9)}${segment(2, 9)} ${segment(1000, 1900)}`;
  }

  getCustomer(email, customerId) {
    return client.get_customer(email, customerId)
      .then(res => console.log(res));
  }

  isDisplayed () {
    return client.is_displayed_in_checkout(cart);
  }

  display(charges, version, type, size) {
    return client.get_marketing_display(charges, version, type, size);
  }

  addEmailTestingConditions(conditions) {
    let addons = '';
    let date = new Date();

    if (Object.keys(conditions).length >= 1) {
      for (let [key, value] of Object.entries(conditions)) {
        addons += '+' + key + '+' + value;
      }
    }

    return this.state.username + '+' + date.getTime() + addons + '@' + this.state.domain;
  }

  launchModal(conditions = {}) {
    let date = new Date();
    const remoteId = date.getTime();
    const customerId = date.getTime();
    const returnUrl = window.location.protocol + '//' + window.location.host + '?id=1&storeId=2';
    const cancelUrl = window.location.protocol + '//' + window.location.host;

    const email = this.addEmailTestingConditions(conditions);
    const address = new ck.Address('Test', 'User', 'Test Company', email, '1 Test Rd', '', 'Testerville', 'CA', '11111', this.state.phone);

    client.begin_checkout(cart, address, address, charges, remoteId, customerId, returnUrl, cancelUrl, 'modal')
      .then(res => ck.checkout(res.checkout_url))
      .catch(err => console.log(err));
  }

  onChange = e => {
    this.setState({ username: e.target.value });
  }

  render() {
    return <div className="App">
      <div className="section">
        <div className="container">
          <h1 className="title">Check Status</h1>
          <Customer client={client} />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h1 className="title">Email</h1>
          <div className="columns is-gapless is-vcentered is-centered">
            <div className="field has-addons">
              <p className="control">
                <input className="input" type="text" name="username" id="username" onChange={this.onChange} value={this.state.username} />
              </p>
              <p className="control">
                <a className="button is-static">
                  @creditkey.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h1 className="title">Standard Checkout &amp; Apply Now</h1>
          <div className="columns">
            <div className="column">
              <div className="creditkey">
                  {this.state.display && <div className="is-size-6" onClick={() => this.launchModal()} dangerouslySetInnerHTML={ { __html: this.state.checkout } } />}
              </div>
            </div>
            <div className="column">
              <div className="creditkey">
                  {this.state.display && <div className="is-size-6" dangerouslySetInnerHTML={ { __html: this.state.marketing_button } } />}
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="creditkey">
                  {this.state.display && <div className="is-size-6" dangerouslySetInnerHTML={ { __html: this.state.marketing } } />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h1 className="title">Pending and Decline Checkouts</h1>
          <div className="columns">
            <div className="column">
              <a className="button is-medium is-info" onClick={() => this.launchModal({ fico: 500 })}>
                <FontAwesomeIcon icon={faSkullCrossbones} />&nbsp;Checkout with Low FICO
              </a>
            </div>
            <div className="column">
              <a className="button is-medium is-info" onClick={() => this.launchModal({ lexis: 'bvi' })}>
                <FontAwesomeIcon icon={faPencilAlt} />&nbsp;Checkout as Pending
              </a>
            </div>
            <div className="column">
              <a className="button is-medium is-info" onClick={() => this.launchModal({ equifax: 'frozen' })}>
                <FontAwesomeIcon icon={faIcicles} />&nbsp;Checkout with Frozen Credit Report
              </a>
            </div>
          </div>
            <div className="columns">
            <div className="column">
              <a className="button is-medium is-info" onClick={() => this.launchModal({ equifax: 'collections' })}>
                <FontAwesomeIcon icon={faSkullCrossbones} />&nbsp;Checkout with Active Collections
              </a>
            </div>
            <div className="column">
              <a className="button is-medium is-info" onClick={() => this.launchModal({ equifax: 'revolving' })}>
                <FontAwesomeIcon icon={faSkullCrossbones} />&nbsp;Checkout with Low Revoling Credit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default App;
