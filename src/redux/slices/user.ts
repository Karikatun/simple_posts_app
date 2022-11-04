import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    updateUser: (state, { payload }) => ({ ...state, ...payload }),
    removeUser: () => ({})
  }
});

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
