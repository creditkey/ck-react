const setState = (state, newState) => {
  return { ...state, ...newState };
};

export const initialState = {};

export default function AdminReducer(state, action) {
  switch(action.type) {
    case 'UPDATE_EMAIL':
      return setState(state, { email_override: action.email });

    case 'UPDATE_PRICE':
      let cartItem = state.cart[0];
      cartItem.data.price = parseInt(action.price);
      return setState(state, { cart: [cartItem] });

    case 'UPDATE_USERNAME':
      return setState(state, { username: action.username });

    case 'UPDATE_VIRTUAL_CARD':
      let merchant_data = state.merchant_data;
      merchant_data.virtual_card = action.virtual_card;

      return setState(state, { merchant_data });

    default:
      return state;
  }
};
