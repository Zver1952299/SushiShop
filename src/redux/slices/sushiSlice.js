import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSushi = createAsyncThunk('sushi/fetchSushiStatus', async (params) => {
  const { sortItem, sortOrder, category, searchValue, pageCount } = params;
  const { data } = await axios.get(
    `https://646ca3e17b42c06c3b2bb0e7.mockapi.io/items?page=${pageCount}&limit=8&${category}&search=${searchValue}&sortBy=${sortItem}&order=${sortOrder}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const sushiSlice = createSlice({
  name: 'sushi',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchSushi.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchSushi.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchSushi.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = sushiSlice.actions;

export default sushiSlice.reducer;
