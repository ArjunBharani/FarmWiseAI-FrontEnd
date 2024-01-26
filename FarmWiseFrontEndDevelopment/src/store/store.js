import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import fieldsReducer from "../slices/fieldSlice";
import formReducer from "../slices/formSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    fields: fieldsReducer,
    form: formReducer,
  },
});