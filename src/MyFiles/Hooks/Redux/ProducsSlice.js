import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Async Thunk to fetch products from the API
export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;  // This will be returned as the payload of the fulfilled action
});

// 2. Initial state
const initialState = {
  myData: [], // This will hold the fetched products
  loading: false, // To track loading state
  error: null, // To track any errors
};

// 3. Slice to handle the products state
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Additional reducers can go here

    // Clear the error message
    clearError(state) {
      state.error = null;
    },
    
    // Reset products and loading state
    resetProducts(state) {
      state.myData = [];
      state.loading = false;
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      // Handling the "pending" state (API call in progress)
      .addCase(getProducts.pending, (state) => {
        state.loading = true; // Set loading to true while fetching
        state.error = null;   // Reset error on a new request
      })
      // Handling the "fulfilled" state (API call successful)
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the fetch is complete
        state.myData = action.payload; // Store the fetched data
      })
      // Handling the "rejected" state (API call failed)
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false; // Set loading to false when fetch fails
        state.error = action.error.message || 'Something went wrong'; // Store the error message
      });
  },
  
});

export default productsSlice.reducer;

// Export the action creators to be used in the component
export const { clearError, resetProducts } = productsSlice.actions;
