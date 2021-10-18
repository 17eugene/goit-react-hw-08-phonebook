// import { combineReducers } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  configureStore,
  // combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  // persistStore,
  PAUSE,
  REHYDRATE,
  PERSIST,
  PURGE,
  FLUSH,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import contactsReducer from "./contacts/contacts-reducer";
import authSlice from "./auth/auth-slice";
import persistStore from "redux-persist/lib/persistStore";

// const rootReducer = combineReducers({
//   contacts: contactsReducer,
// });

// const store = createStore(rootReducer, composeWithDevTools());

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PAUSE, REHYDRATE, PERSIST, PURGE, FLUSH],
    },
  }),
];

// const persistConfig = {
//   key: "contacts",
//   storage,
//   blacklist: ["filter"],
// };

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

// const rootReducer = combineReducers({
//   //contacts: persistReducer(persistConfig, contactsReducer), //персистим contactsReducer чтобы изолироваться от фильтра в localeStorage
//   contacts: contactsReducer,
//   auth: authSlice,
// });

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: persistReducer(authPersistConfig, authSlice),
  },
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
