export const customStyles = (menuList) => ({
  control: () => ({
    display: 'flex',
    width: '100%',
    minHeight: 56,
    border: '1px solid #A2A5A8',
    borderRadius: 4,
    fontSize: 14,
  }),
  menuList,
  menu: (props) => ({ ...props, zIndex: 10 }),
});
