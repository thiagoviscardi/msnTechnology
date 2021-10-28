export const updateCheckboxStatus = (id, checked, state) => {
  return [
    ...state.map((item) => {
      if (item.id === parseInt(id)) {
        item.checked = checked;
        return item;
      } else {
        return item;
      }
    }),
  ];
};
