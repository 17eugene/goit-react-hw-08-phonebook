import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

const token = {
  setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unsetToken() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = createAsyncThunk("auth/registration", async (credentials) => {
  try {
    const response = await axios.post("users/signup", credentials);
    token.setToken(response.data.token);
    return response.data;
  } catch (error) {}
});

const signIn = createAsyncThunk("user/authorization", async (credentials) => {
  try {
    const response = await axios.post("users/login", credentials);
    token.setToken(response.data.token);
    return response.data;
  } catch (error) {}
});

const signOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("users/logout");
    token.unsetToken();
  } catch (error) {}
});

const refreshCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, ThunkApi) => {
    const state = ThunkApi.getState();
    const savedToken = state.auth.token;

    if (savedToken === null) {
      return ThunkApi.rejectWithValue();
    }

    token.setToken(savedToken);
    try {
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {}
  }
);

const authOperations = {
  register,
  signIn,
  signOut,
  refreshCurrentUser,
};

export default authOperations;

// const signup =
//   ({ name, email, password }) =>
//   (dispatch) => {
//     const user = { name, email, password };
//     dispatch(actions.registerUserRequest());

//     axios
//       .post("/auth/signup", user)
//       .then(({ data }) => dispatch(action.registerUserSuccess(data.data)))
//       .catch((error) => dispatch(action.registerUserError(error)));
//   };

// const signin =
//   ({ email, password }) =>
//   (dispatch) => {
//     const user = { email, password };
//     dispatch(actions.loginUserRequest());

//     axios
//       .post("/auth/signin", user)
//       .then(({ data }) => {
//         dispatch(action.loginUserSuccess(data.data));
//         token.setToken(data.data.token);
//       })
//       .catch((error) => dispatch(action.loginUserError(error)));
//   };

// const signout = () => (dispatch) => {
//   dispatch(action.signoutUserRequest());

//   axios
//     .post("/auth/signout")
//     .then(() => {
//       dispatch(actions.signoutUserSuccess());
//       token.unsetToken();
//     })
//     .catch((error) => dispatch(actions.signoutUserError(error)));
// };
