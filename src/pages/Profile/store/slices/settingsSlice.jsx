import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    organization: '',
    settings: ''
  },
  notifications: {
    email: true,
    sms: false,
    pushOnly: false,
    frequency: 'immediately'
  },
  integration: {
    connectedExternal: ''
  },
  security: {
    newPassword: '',
    confirmPassword: ''
  },
  timezone: 'Central Time - US & Canada'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateNotificationSetting: (state, action) => {
      const { setting, value } = action.payload;
      state.notifications[setting] = value;
    },
    updateNotificationFrequency: (state, action) => {
      state.notifications.frequency = action.payload;
    },
    updateIntegration: (state, action) => {
      state.integration = { ...state.integration, ...action.payload };
    },
    updateSecurityField: (state, action) => {
      const { field, value } = action.payload;
      state.security[field] = value;
    },
    updateTimezone: (state, action) => {
      state.timezone = action.payload;
    },
    resetPasswordFields: (state) => {
      state.security.newPassword = '';
      state.security.confirmPassword = '';
    }
  }
});

export const { 
  updateProfile, 
  updateNotificationSetting, 
  updateNotificationFrequency, 
  updateIntegration, 
  updateSecurityField, 
  updateTimezone, 
  resetPasswordFields 
} = settingsSlice.actions;

export default settingsSlice.reducer;