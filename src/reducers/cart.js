function itemFactory(action) {
  return { category: action.category, slug: action.slug, qty: 1 };
}

function isSameItem(item, action) {
  return item.category === action.category && item.slug === action.slug;
}

export const initialState = [
  itemFactory({ category: "ice-machines", slug: "ice-o-matic" }),
  itemFactory({ category: "ice-machines", slug: "air-cooled" }),
  itemFactory({ category: "ice-machines", slug: "water-cooled" }),
  itemFactory({ category: "ice-machines", slug: "remote-condenser" }),
];

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
      return items;

    case actions.removeItem:
      state.forEach((item) => {
        if (!isSameItem(item, action)) {
          items.push(item);
        }
      });
      return items;

    case actions.changeQuantity:
      state.forEach((item) => {
        if (isSameItem(item, action)) {
          items.push({ ...item, qty: item.qty + 1 });
        } else {
          items.push(item);
        }
      });
      return items;

    default:
      return state;
  }
}
