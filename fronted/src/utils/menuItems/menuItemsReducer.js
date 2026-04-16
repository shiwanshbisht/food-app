const initialState = {
  data: [],
  totalPages: 1,
  currentPage: 1
};

const menuItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENUITEMS':
      return {
        ...state,
        data: action.payload.items || [],
        totalPages: action.payload.totalPages || 1,
        currentPage: action.payload.page || 1
      };
    case 'APPEND_MENUITEMS':
      return {
        ...state,
        data: [...state.data, ...(action.payload.items || [])],
        totalPages: action.payload.totalPages || 1,
        currentPage: action.payload.page || 1
      };
    default:
      return state;
  }
};

export default menuItemReducer;