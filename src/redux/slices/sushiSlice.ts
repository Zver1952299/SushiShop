import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { SortItem } from './filterSlice';

type SushiItem = {
  id: string;
  imageUrl: string;
  title: string;
  composition: string;
  price: number;
  size: number[];
  width: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface SushiSliceState {
  items: SushiItem[];
  status: Status;
}

const initialState: SushiSliceState = {
  items: [],
  status: Status.LOADING,
};

export type SearchSushiParams = {
  sortItem: string;
  sortOrder: string;
  category: string;
  searchValue: string;
  pageCount: string;
};

export const fetchSushi = createAsyncThunk<SushiItem[], SearchSushiParams>(
  'sushi/fetchSushiStatus',
  async (params) => {
    const { sortItem, sortOrder, category, searchValue, pageCount } = params;
    const { data } = await axios.get<SushiItem[]>(
      `https://646ca3e17b42c06c3b2bb0e7.mockapi.io/items?page=${pageCount}&limit=8&${category}&search=${searchValue}&sortBy=${sortItem}&order=${sortOrder}`,
    );
    return data;
  },
);

const sushiSlice = createSlice({
  name: 'sushi',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<SushiItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSushi.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchSushi.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchSushi.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectSushi = (state: RootState) => state.sushi;

export const { setItems } = sushiSlice.actions;

export default sushiSlice.reducer;
