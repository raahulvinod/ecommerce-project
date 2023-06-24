import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import pcategoryService from './pcategoryService';

export const getCategories = createAsyncThunk(
  'productCategory/get-productCategories',
  async (thunkAPI) => {
    try {
      return await pcategoryService.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  'productCategory/create-category',
  async (categoryData, thunkAPI) => {
    try {
      return await pcategoryService.createCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');


const initialState = {
  pCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const pcategorySlice = createSlice({
  name: 'pCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pcategorySlice.reducer;
