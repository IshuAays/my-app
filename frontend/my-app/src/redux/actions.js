// src/redux/actions.js

// Action types
export const SET_USER_DATA = 'SET_USER_DATA';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_ERROR = 'SET_ERROR';

// Action creators

// Set user data (this can be fetched from login)
export const setUserData = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: userData
  };
};

// Login success
export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

// Logout action
export const logout = () => {
  return {
    type: LOGOUT
  };
};

// Set error message
export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error
  };
};
