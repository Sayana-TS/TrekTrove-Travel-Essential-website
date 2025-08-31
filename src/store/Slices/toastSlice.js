import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    showToast: (state, action) => {
      const { message, type } = action.payload;
      state.push({ id: Date.now(), message, type });
    },
    removeToast: (state, action) => {
      return state.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { showToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
