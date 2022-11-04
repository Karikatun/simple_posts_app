import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, { payload }) => [...state, payload],
    removePost: (state, { payload }) => state.filter(item => item.id !== payload),
    toggleBooked: (state, { payload }) => state.map((item) => {
      if (item.id === payload) {
        return { ...item, booked: !item.booked };
      }
      return item;
    }),
    editPost: (state, { payload }) => state.map((item) => {
      if (item.id === payload.id) return payload;
      return item;
    })
  }
});

export const { addPost, removePost, toggleBooked, editPost } = postsSlice.actions;
export default postsSlice.reducer;
