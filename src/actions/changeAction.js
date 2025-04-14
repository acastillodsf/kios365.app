// Toggle menu
export function toggleMenu(val) {
    return (dispatch) => {
      dispatch(toggleView(val));
    };
  }
  const toggleView = (val) => ({
    type: val.type,
    sidebarShow: val.sidebarShow,
  });