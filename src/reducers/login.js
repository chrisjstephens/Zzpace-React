import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_USER } from '../actions/types.js';

const INITIAL_STATE = {
  username: '',
  token: '',
  error: ''
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {...state, username: action.payload.username, token: action.payload.token, error: ''} //TODO:ADD TYPE
      case LOGIN_ERROR:
        return {...state, username: '', token: '', error: action.payload}
      case LOGOUT_USER:
        return {...state, username: '', token: '', error: ''}
      default:
        return state;
    }
  }
