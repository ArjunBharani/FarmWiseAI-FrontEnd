import { createSlice } from "@reduxjs/toolkit";
export const formSlice = createSlice({
  name: "form",
  initialState: {
    FormData: [],
  },
  reducers: {
    updateFormData: (state, action) => {
      state.FormData = action.payload;
    },
    resetForm: (state) => {
      state.FormData = [];
    },
  },
});
export const { updateFormData, resetForm } = formSlice.actions;

export default formSlice.reducer;