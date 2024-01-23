import { createSlice } from '@reduxjs/toolkit';

// Initial state for the menu slice
const initialState = {
  openItem: ['dashboard'],
  defaultId: 'dashboard',
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true,
};

// Create a menu reducer slice using createSlice
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveItem: (state, action) => {
      state.openItem = action.payload.openItem;
    },

    setActiveComponent: (state, action) => {
      state.openComponent = action.payload.openComponent;
    },

    setOpenDrawer: (state, action) => {
      state.drawerOpen = action.payload.drawerOpen;
    },

    setOpenComponentDrawer: (state, action) => {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },
  },
});

// Extract reducer and actions from the menu slice
const { reducer, actions } = menuSlice;

// Export the reducer
export default reducer;

// Export individual action creators for convenience
export const {
  setActiveItem,
  setActiveComponent,
  setOpenDrawer,
  setOpenComponentDrawer,
} = actions;