import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import bcategoryService from './bcategoryservice';

export const getBlogCategories = createAsyncThunk(
  'blogCategory/get-blogCategories',
  async (thunkAPI) => {
    try {
      return await bcategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  'blogCategory/create-blogCategories',
  async (blogData, thunkAPI) => {
    try {
      return await bcategoryService.createBlogCategory(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlogCategory = createAsyncThunk(
  'blogCategory/get-blogCategory',
  async (id, thunkAPI) => {
    try {
      return await bcategoryService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateABlogCategory = createAsyncThunk(
  'blogCategory/update-blogCategory',
  async (brand, thunkAPI) => {
    try {
      return await bcategoryService.updateBlogCategory(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlogCategory = createAsyncThunk(
  'blogCategory/delete-blogCategory',
  async (id, thunkAPI) => {
    try {
      return await bcategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const bcategorySlice = createSlice({
  name: 'bCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCatName = action.payload.title;
      })
      .addCase(getABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogCategory = action.payload;
      })
      .addCase(updateABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogCategory = action.payload;
      })
      .addCase(deleteABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bcategorySlice.reducer;
