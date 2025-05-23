import { configureStore } from '@reduxjs/toolkit';
import claimsReducer from './slices/claimsSlice';
import tasksReducer from './slices/tasksSlice';
import notificationsReducer from './slices/notificationsSlice';
import forumReducer from './slices/forumSlice';
import uiReducer from './slices/uiSlice';
import settingsReducer from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    claims: claimsReducer,
    tasks: tasksReducer,
    notifications: notificationsReducer,
    forum: forumReducer,
    ui: uiReducer,
    settings: settingsReducer,
  },
});

export default store;