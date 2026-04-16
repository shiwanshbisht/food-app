import axios from 'axios';
const backendurl = process.env.REACT_APP_BACKEND_API_URL;

const menuItemAction = (page = 1, limit = 15, append = false) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://food-app-kxjf.onrender.com/menuitem?page=${page}&limit=${limit}`);
      if (append) {
        dispatch({
          type: 'APPEND_MENUITEMS',
          payload: response.data,
        });
      } else {
        dispatch({
          type: 'MENUITEMS',
          payload: response.data,
        });
      }
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };
};

export default menuItemAction;