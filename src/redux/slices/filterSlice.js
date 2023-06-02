import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: 'popilarity',
    sortType: 'raiting',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilter(state, action) {
      state.sort = action.payload.sort;
      state.categoryId = +action.payload.categoryId;
      state.pageCount = +action.payload.pageCount;
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
