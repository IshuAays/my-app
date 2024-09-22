import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage for web)
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Define the initial state for user
const initialState = {
  user: null,
};

// Define a user reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage, // Use localStorage to persist state
};

// Combine your reducers (if you plan to add more reducers later)
const rootReducer = combineReducers({
  user: userReducer, // Add your reducers here
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with persisted reducer
const store = createStore(persistedReducer);

// Create the persistor for Redux Persist
const persistor = persistStore(store);

export { store, persistor };
