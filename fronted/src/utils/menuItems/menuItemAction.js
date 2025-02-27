import axios from 'axios';
const backendurl = process.env.REACT_APP_BACKEND_API_URL;

const menuItemAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:4001/menuitem`);
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
