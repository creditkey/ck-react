import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ck from 'creditkey-js';

class Customer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      status: ''
    }
  }

  onChange = e => {
    this.setState({ email: e.target.value });

    if (e.target.value == '') {
      this.setState({ status: '' });
    }

    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(e.target.value)) {
      this.props.client.get_customer(e.target.value, 1)
      .then(res => this.setState({ status: res.status }))
      .catch(err => this.setState({ status: err.message }));
    }
  }

  render() {
    return <div className="columns">
      <div className="column" />
      <div className="column is-half">
        <div className="field">
          <p className="control has-icons-left">
            <input type="text" className="input" name="email" value={this.state.email} onChange={this.onChange} />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </p>
        </div>
      </div>
      <div className="column has-text-left is-size-5">
        {this.state.status != '' && <div>{this.state.status}</div>}
      </div>
    </div>;
  }
}

export default Customer;
