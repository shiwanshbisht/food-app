import axios from 'axios';
const backendurl = process.env.REACT_APP_BACKEND_API_URL;

const menuItemAction = (page = 1, limit = 15) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://food-app-kxjf.onrender.com/menuitem?page=${page}&limit=${limit}`);
      dispatch({
        type: 'MENUITEMS',
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };
};

export default menuItemAction;
