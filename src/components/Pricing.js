import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

export default function Pricing(props) {
  const [price, setPrice] = useState(0);
  const updatePrice = price => props.dispatch({
    type: 'UPDATE_PRICE',
    price: price
  });

  return (
    <div className="field">
      <p className="control has-icons-left">

        <input 
          className="input" 
          type="text" 
          name="price_override" 
          id="price_override" 
          placeholder="Price Override" 
          onChange={e => {
            setPrice(e.target.value);
            return updatePrice(e.target.value);
          }}
          value={props.cart[0].data.price} />

        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faDollarSign} />
        </span>
      </p>
    </div>
  )
}
