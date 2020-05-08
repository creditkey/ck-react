import React from 'react';
import ck from 'creditkey-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEnvelope, faSadTear, faSkullCrossbones, faPencilAlt, faIcicles } from '@fortawesome/free-solid-svg-icons'
import Customer from './Customer';
import './App.css';
import 'bulma';

function setupCkClient(host) {
  if (host === 'localhost') {
    return new ck.Client('creditkeydev_2822baea77774929979f1e5964dd18b6'); // development
  } else {
    return new ck.Client('creditkeytest_6d8e5758033846b4995993dd74dda57c', 'staging'); // staging
  }
}

const client  = setupCkClient(window.location.hostname);

function makePhoneNumber() {
  let segment = (min, max) => (min + Math.random() * (max - min)).toFixed();

  return `+1 800 ${segment(2, 9)}${segment(0, 9)}${segment(2, 9)} ${segment(1000, 1900)}`;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [new ck.CartItem('1', 'Test Product', 1000, '1-TP', 1)],
      username: 'egoodman',
      domain: 'creditkey.com',
      email_override: '',
      phone: makePhoneNumber(), 
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

    this.loadDisplays();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      this.loadDisplays();
    }
  }

  loadDisplays = () => {
    client.is_displayed_in_checkout(this.state.cart) 
      .then(res => this.setState({ display: res }))
      .then(res => client.get_marketing_display(this.calcCharges(), 'checkout', 'text', 'small'))
      .then(res => this.setState({ checkout: res }))
      .then(res => client.get_marketing_display(this.calcCharges(), 'pdp', 'text', 'special'))
      .then(res => this.setState({ marketing: res }))
      .then(res => client.get_marketing_display(this.calcCharges(), 'pdp', 'button', 'small'))
      .then(res => this.setState({ marketing_button: res }))
      .then(res => this.getCustomer(this.state.email, 1))
      .catch(err => console.log(err));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  setCartItemPrice = e => {
    let cartItem = this.state.cart[0];
    cartItem.data.price = parseInt(e.target.value);
    this.setState({ cart: [cartItem] });
  }

  calcCharges = () => {
    let charges =  new ck.Charges(0, 100, 5.50, 0, 105.50);

    this.state.cart.forEach(c => {
      charges.data.total += c.data.price;
      charges.data.grand_total += c.data.price;
    });

    return charges;
  }

  getCustomer(email, customerId) {
    return client.get_customer(email, customerId)
      .then(res => console.log(res));
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
    const address = new ck.Address('Test', 'User', 'Test Company', this.state.email_override !== '' ? this.state.email_override : email, '1 Test Rd', '', 'Testerville', 'CA', '11111', this.state.phone);

    client.begin_checkout(this.state.cart, address, address, this.calcCharges(), remoteId, customerId, returnUrl, cancelUrl, 'modal')
      .then(res => ck.checkout(res.checkout_url))
      .catch(err => console.log(err));
  }

  render() {
    return <div className="App">
      <h1 className="title"><img src="ck-mark.svg" style={{verticalAlign:'middle'}} /> CK React Test App</h1>
      
      <hr/>
      <div className="container">
        <h1 className="title">Override Options</h1>
        <div className="columns">

          <div className="column">
            <Customer client={client} />
          </div>

          <div className="column">
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

          <div className="column">
            <div className="field">
              <p className="control has-icons-left">
                <input className="input" type="text" name="email_override" id="email_override" placeholder="Email Override" onChange={this.onChange} value={this.state.email_override} />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </p>
            </div>
          </div>

          <div className="column">
            <div className="field">
              <p className="control has-icons-left">
                <input className="input" type="text" name="price_override" id="price_override" placeholder="Price Override" onChange={this.setCartItemPrice} value={this.state.price_override} />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr/>

      <h1 className="title">Standard Checkout &amp; Apply Now</h1>
      <div className="columns">
        <div className="column">
          <div className="creditkey">
              {this.state.display && <div className="is-size-6" onClick={() => this.launchModal()} dangerouslySetInnerHTML={ { __html: this.state.checkout } } />}
              <p>as Tier 2</p>
              {this.state.display && <div className="is-size-6" onClick={() => this.launchModal({ fico: 651 })} dangerouslySetInnerHTML={ { __html: this.state.checkout } } />}
              <p>as Tier 3</p>
              {this.state.display && <div className="is-size-6" onClick={() => this.launchModal({ fico: 601 })} dangerouslySetInnerHTML={ { __html: this.state.checkout } } />}
          </div>
        </div>
        <div className="column">
          <div className="creditkey">
            <p>Standard Apply Now</p>
            {this.state.display && <div className="is-size-6" dangerouslySetInnerHTML={ { __html: this.state.marketing_button } } />}
            <p>Special Apply Now</p>
            {this.state.display && <div className="is-size-6" dangerouslySetInnerHTML={ { __html: this.state.marketing } } />}
          </div>
        </div>
      </div>

      <hr/>

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
            <FontAwesomeIcon icon={faSkullCrossbones} />&nbsp;Checkout with Low Revolving Credit
          </a>
        </div>
        <div className="column">
          <a className="button is-medium is-info" onClick={() => this.launchModal({ equifax: 'fraud' })}>
            <FontAwesomeIcon icon={faSadTear} />&nbsp;Checkout with Fraud Alert
          </a>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <a className="button is-medium is-info" onClick={() => this.launchModal({ iovation: 'fail' })}>
            <FontAwesomeIcon icon={faSadTear} />&nbsp;Checkout with Iovation Failure
          </a>
        </div>
      </div>
    </div>
  }
}

export default App;
