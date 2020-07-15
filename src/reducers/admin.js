const setState = (state, newState) => {
  return {...state, ...newState};
}

export default function reducer(state, action) {
  switch(action.type) {
    case 'UPDATE_EMAIL':
      return setState(state, { email_override: action.email });

    case 'UPDATE_PRICE':
      let cartItem = state.cart[0];
      cartItem.data.price = parseInt(action.price);
      return setState(state, { cart: [cartItem] });

    case 'UPDATE_USERNAME':
      return setState(state, { username: action.username });

    default:
      return state;
  }
}
