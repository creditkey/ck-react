const setState = (state, newState) => {
  return { ...state, ...newState };
};

export const initialState = {
  items: {}
};

export const actions = {
  addItem: "ADD_ITEM",
  removeItem: "REMOVE_ITEM",
  changeQuantity: "CHANGE_QUANTITY"
}

export default function CartReducer(state, action) {
  switch(action.type) {
    case actions.addItem:
      return setState(state, { items: { ...state.items, [action.key]: 1 } });

    case actions.removeItem:
      const items = {};
      Object.keys(state.items).forEach(key => {
        if (key !== action.key) items.push(state.items[key])
      });
      return setState(state, { items });

    case actions.changeQuantity:
      return setState(state, { items: { ...state.items,  [action.key]: action.qty } });
      
    default:
      return state;
  }
};
