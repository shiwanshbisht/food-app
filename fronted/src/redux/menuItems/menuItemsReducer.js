const initialState = {
    data: ["asdasd"], 
};
  
const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'MENUITEMS':
        return { ...state, data: action.payload }; 
      default:
        return state; 
    }
};
  
export default menuItemReducer;