import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Async Thunks to fetch data from multiple APIs
export const getProducts = createAsyncThunk('newProduct/getProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
});

export const getCategories = createAsyncThunk('newProduct/getCategories', async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data;
});

export const getUsers = createAsyncThunk('newProduct/getUsers', async () => {
    const response = await fetch('https://fakestoreapi.com/users'); // Replace with your actual API endpoint if needed
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  });

// 2. Initial state
const initialState = {
  products: [], // To hold the fetched products
  categories: [], // To hold the fetched categories
  users: [], // To hold the fetched users
  loading: false, // To track loading state
  error: null, // To track any errors
};

// 3. Slice to handle the products, categories, and users state
const MultiProductSlice = createSlice({
  name: 'newProduct',
  initialState,
  reducers: {
    // Additional reducers for general actions like clearing error or resetting state
    clearError(state) {
      state.error = null;
    },
    resetData(state) {
      state.products = [];
      state.categories = [];
      state.users = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handling the "pending" state (API calls in progress)
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Handling the "fulfilled" state (API calls successful)
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.myData = action.payload; // Save the fetched users in `myData`
      })

      // Handling the "rejected" state (API calls failed)
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export default MultiProductSlice.reducer;

// Export the action creators to be used in the component
export const { clearError, resetData } = MultiProductSlice.actions;
