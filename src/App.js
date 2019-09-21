import React from 'react';
import ck from 'creditkey-js';
import './App.css';

const publicKey = 'creditkeydev_2822baea77774929979f1e5964dd18b6'; // replace this with your public key issued by Credit Key support
const client = new ck.Client(publicKey); // NOTE: if you have been setup on Credit Key's staging environment you will need to add a second optional argument of 'staging'
const cart = [new ck.CartItem('1', 'Test Product', 1000, '1-TP', 1)];
const address = new ck.Address('Test', 'User', 'Test Company', 'egoodman+' + Math.floor((Math.random() * 1000) + 1) + '@creditkey.com', '1 Test Rd', '', 'Testerville', 'CA', '11111', '6178160912');
const charges = new ck.Charges(1000, 100, 0, 0, 1100);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
      marketing: ''
    }
  }

  componentDidMount() {
    this.isDisplayed()
      .then(res => this.setState({ display: res }))
      .then(res => this.marketingDisplay())
      .then(res => this.setState({ marketing: res }))
      .catch(err => alert(err));
  }

  isDisplayed () { 
    return client.is_displayed_in_checkout(cart)
  }

  marketingDisplay() {
    return client.get_marketing_display(charges)
  }

  launchModal() {
    const remoteId = Math.floor((Math.random() * 1000) + 1);
    const customerId = Math.floor((Math.random() * 1000) + 1);
    const returnUrl = window.location.protocol + '//' + window.location.host + '?id=1&storeId=2';
    const cancelUrl = window.location.protocol + '//' + window.location.host;

    client.begin_checkout(cart, address, address, charges, remoteId, customerId, returnUrl, cancelUrl, 'modal')
      .then(res => ck.checkout(res.checkout_url))
      .catch(err => alert(err));
  }

  render() {
    return <div className="App">
      <header className="App-header">
        {this.state.display && <div onClick={this.launchModal} dangerouslySetInnerHTML={ { __html: this.state.marketing } } />}
      </header>
    </div>
  }
}

export default App;
