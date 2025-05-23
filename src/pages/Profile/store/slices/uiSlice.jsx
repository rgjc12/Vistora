import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'claims-summary',
  helpSubmenuOpen: false,
  sidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    toggleHelpSubmenu: (state) => {
      state.helpSubmenuOpen = !state.helpSubmenuOpen;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const { setActiveTab, toggleHelpSubmenu, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;