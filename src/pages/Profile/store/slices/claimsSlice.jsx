import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call
export const fetchClaims = createAsyncThunk(
  'claims/fetchClaims',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 1,
        name: 'Alexander',
        provider: 'Foley',
        details: 'alexander.foley@gmail.com',
        phoneNumber: '+27 6 99 88 77 66',
        status: 'Completed'
      },
      {
        id: 2,
        name: 'Alexander',
        provider: 'Foley',
        details: 'alexander.foley@gmail.com',
        phoneNumber: '+27 6 99 88 77 66',
        status: 'Active'
      },
      {
        id: 3,
        name: 'Alexander',
        provider: 'Foley',
        details: 'alexander.foley@gmail.com',
        phoneNumber: '+27 6 99 88 77 66',
        status: 'Inactive'
      },
      {
        id: 4,
        name: 'Alexander',
        provider: 'Foley',
        details: 'alexander.foley@gmail.com',
        phoneNumber: '+27 6 99 88 77 66',
        status: 'Pending'
      }
    ];
  }
);

export const submitClaim = createAsyncThunk(
  'claims/submitClaim',
  async (claimData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: Date.now(),
      ...claimData,
      status: 'Pending'
    };
  }
);

const initialState = {
  claims: [],
  stats: {
    total: 311,
    active: 42,
    pending: 60,
    rejected: 86
  },
  loading: false,
  error: null,
  searchQuery: '',
};

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    removeClaim: (state, action) => {
      state.claims = state.claims.filter(claim => claim.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClaims.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClaims.fulfilled, (state, action) => {
        state.loading = false;
        state.claims = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitClaim.fulfilled, (state, action) => {
        state.claims.unshift(action.payload);
        state.stats.total += 1;
        state.stats.pending += 1;
      });
  },
});

export const { setSearchQuery, removeClaim } = claimsSlice.actions;
export default claimsSlice.reducer;