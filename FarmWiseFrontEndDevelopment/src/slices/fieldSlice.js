import { createSlice } from "@reduxjs/toolkit";

export const fieldsSlice = createSlice({
  name: "fields",
  initialState: {
    fieldList: [],
  },
  reducers: {
    addField: (state, action) => {
      state.fieldList.push(action.payload);
    },
    resetFields: (state) => {
      state.fieldList = [];
    },
  },
});

export const { addField, resetFields } = fieldsSlice.actions;

export default fieldsSlice.reducer;