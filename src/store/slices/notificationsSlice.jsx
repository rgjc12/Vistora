import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at pretium risus, vitae vulputate elit.",
        date: "March 7, 2023"
      },
      {
        id: 2,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at pretium risus, vitae vulputate elit. Curabitur libero ante, pretium et tempor nec, dignissim tempor dolor.",
        date: "February 28, 2023"
      },
      {
        id: 3,
        text: "Mauris ac est tellus. Donec eu pulvinar lorem, et amet pharetra lorem. Mauris quis mauris tellus. Integer tellus mi elementum ultrices vestibulum.",
        date: "April 15, 2023"
      },
      {
        id: 4,
        text: "Mauris vestibulum sapien a nibh condimentum suscipit.",
        date: "March 8, 2023"
      },
      {
        id: 5,
        text: "Mauris ac est tellus. Donec eu pulvinar lorem, et amet pharetra lorem. Mauris quis mauris tellus. Integer tellus mi elementum ultrices vestibulum. Integer nec eleifend quam. Praesent ligula ante, bibendum vel dolor dignissim, sodales posuere tellus.",
        date: "March 1, 2023"
      }
    ];
  }
);

const initialState = {
  notifications: [],
  unreadCount: 3,
  loading: false,
  error: null,
  searchQuery: '',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    dismissNotification: (state, action) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
      if (state.unreadCount > 0) {
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.unreadCount = 0;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        text: action.payload.text,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      state.unreadCount += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  setSearchQuery, 
  dismissNotification, 
  markAllAsRead, 
  addNotification 
} = notificationsSlice.actions;

export default notificationsSlice.reducer;