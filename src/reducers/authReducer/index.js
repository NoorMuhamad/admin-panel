import { createSlice } from '@reduxjs/toolkit';

// Initial state for the auth slice
const persistedUser = localStorage.getItem('user');
const initialState = {
	user: persistedUser ? JSON.parse(persistedUser) : {},
};

// Create an auth reducer slice using createSlice
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			state.user = action.payload.user;
		},
		logout: (state) => {
			localStorage.removeItem('user');
			state.user = {};
		},
	},
});

// Extract reducer and actions from the auth slice
const { reducer, actions } = authSlice;

// Export the reducer
export default reducer;

// Export individual action creators for convenience
export const {
	setUser,
	logout
} = actions;
