// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import notificationsReducer from "./slices/notificationsSlice";
import claimsReducer from "./slices/claimsSlice";
import forumsReducer from "./slices/forumSlice";
import tasksReducer from "./slices/tasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    claims: claimsReducer,
    forums: forumsReducer,
    tasks: tasksReducer,
  },
});
