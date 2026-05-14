import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getProducts();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load products matrix");
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  recentlyViewed: JSON.parse(localStorage.getItem('recentlyViewed')) || [],
  filters: {
    category: 'All Products',
    priceRange: [0, 1000],
    sortBy: 'featured', // 'featured', 'price-low', 'price-high', 'rating'
    searchQuery: '',
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    addToRecentlyViewed: (state, action) => {
      const filtered = state.recentlyViewed.filter(p => p.id !== action.payload.id);
      state.recentlyViewed = [action.payload, ...filtered].slice(0, 5);
      localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const selectFilteredProducts = (state) => {
  const { items, filters } = state.products;
  let result = [...items];
  
  // Category Filter
  if (filters.category !== 'All Products') {
    result = result.filter(p => p.category === filters.category);
  }

  // Search Filter
  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  switch (filters.sortBy) {
    case 'price-low':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    default: // featured or newest logic
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  return result;
};

export const { setFilter, resetFilters, addToRecentlyViewed } = productsSlice.actions;
export default productsSlice.reducer;
