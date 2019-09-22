import React from 'react';
import ck from 'creditkey-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones, faPencilAlt, faIcicles } from '@fortawesome/free-solid-svg-icons'
import Customer from './Customer';
import './App.css';
import 'bulma';

const publicKey = 'creditkeydev_2822baea77774929979f1e5964dd18b6'; // replace this with your public key issued by Credit Key support
const client = new ck.Client(publicKey); // NOTE: if you have been setup on Credit Key's staging environment you will need to add a second optional argument of 'staging'
const cart = [new ck.CartItem('1', 'Test Product', 1000, '1-TP', 1)];

const randomNum = Math.floor((Math.random() * 1000) + 1);

const username = 'egoodman';
const domain = 'creditkey.com';
const phone = '6178160912';
const email = username + randomNum + '@' + domain;

const address = new ck.Address('Test', 'User', 'Test Company', email, '1 Test Rd', '', 'Testerville', 'CA', '11111', phone);
const charges = new ck.Charges(1000, 100, 0, 0, 1100);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
      checkout: '',
      marketing: ''
    }
  }

  componentDidMount() {
    this.isDisplayed()
      .then(res => this.setState({ display: res }))
      .then(res => this.display(charges, 'checkout', 'text', 'small'))
      .then(res => this.setState({ checkout: res }))
      .then(res => this.display(charges, 'pdp', 'text', 'small'))
      .then(res => this.setState({ marketing: res }))
      .then(res => this.getCustomer('egoodman+1002d@creditkey.com', 1))
      .catch(err => alert(err));
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

    if (Object.keys(conditions).length >= 1) {
      for (let [key, value] of Object.entries(conditions)) {
        addons += '+' + key + '+' + value;
      }
    }

    return username + randomNum + addons + '@' + domain;
  }

  launchModal(conditions = {}) {
    const remoteId = randomNum;
    const customerId = randomNum;
    const returnUrl = window.location.protocol + '//' + window.location.host + '?id=1&storeId=2';
    const cancelUrl = window.location.protocol + '//' + window.location.host;

    address.data.email = this.addEmailTestingConditions(conditions);

    client.begin_checkout(cart, address, address, charges, remoteId, customerId, returnUrl, cancelUrl, 'modal')
      .then(res => ck.checkout(res.checkout_url))
      .catch(err => alert(err));
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
          <h1 className="title">Standard Checkout</h1>
          <div className="columns">
            <div className="column">
              <div className="creditkey">
                  {this.state.display && <div className="is-size-6" onClick={() => this.launchModal()} dangerouslySetInnerHTML={ { __html: this.state.checkout } } />}
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
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h1 className="title">Apply Now</h1>
          <div className="columns">
            <div className="column">
              <div className="creditkey">
                  {this.state.display && <div className="is-size-6" style={{ textDecoration: 'underline' }} dangerouslySetInnerHTML={ { __html: this.state.marketing } } />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default App;
