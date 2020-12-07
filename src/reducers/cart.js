function itemFactory(action) {
  return { category: action.category, slug: action.slug, qty: 1 };
}

function isSameItem(item, action) {
  return item.category === action.category && item.slug === action.slug;
}

function persistState(state) {
  localStorage.setItem('ck-cart', JSON.stringify(state));
  return state;
}

function fetchState() {
  const stored = localStorage.getItem("ck-cart");
  return (stored) ? JSON.parse(stored) : [];
}

export const initialState = fetchState();

export const actions = {
  addItem: "ADD_ITEM",
  removeItem: "REMOVE_ITEM",
  changeQuantity: "CHANGE_QUANTITY",
};

export default function CartReducer(state, action) {
  const items = [];
  let previouslyAdded = false;

  switch (action.type) {
    case actions.addItem:
      state.forEach((item) => {
        if (isSameItem(item, action)) {
          items.push({ ...item, qty: item.qty + 1 });
          previouslyAdded = true;
        } else {
          items.push(item);
        }
      });
      if (!previouslyAdded) items.push(itemFactory(action));
      return persistState(items);

    case actions.removeItem:
      state.forEach((item) => {
        if (!isSameItem(item, action)) {
          items.push(item);
        }
      });
      return persistState(items);

    case actions.changeQuantity:
      state.forEach((item) => {
        if (isSameItem(item, action)) {
          items.push({ ...item, qty: item.qty + 1 });
        } else {
          items.push(item);
        }
      });
      return persistState(items);

    default:
      return state;
  }
}
