import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_USER } from './types.js';

export const signin = (formData) => async dispatch => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_ADDRESS + "/api/signin",
      formData
    );

    response.data.username = formData.username; //TODO: get type from user eventually admin/customer
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', formData.username);
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: 'Invalid login credentials' });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  return {
    type: LOGOUT_USER,
    payload: ''
  };
};
