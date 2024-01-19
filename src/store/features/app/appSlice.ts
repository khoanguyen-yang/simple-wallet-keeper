import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  hasPassword: boolean; // indicate whether the user has already setup password
  loggedIn: boolean;
}

export const initialState: AppState = {
  hasPassword: false,
  loggedIn: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    finishPasswordSetup: (state) => {
      state.hasPassword = true;
      state.loggedIn = true;
    },
    loginSuccess: (state) => {
      state.loggedIn = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { finishPasswordSetup, loginSuccess } = appSlice.actions;

export default appSlice.reducer;
