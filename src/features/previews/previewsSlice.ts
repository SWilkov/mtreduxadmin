import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { RecipePreview } from "../../app/models/recipe-preview.model";

export interface RecipePreviewsState {
  previews: RecipePreview[];
  loading: boolean;
  loaded: boolean;
}

const initialState: RecipePreviewsState = {
  previews: [],
  loading: false,
  loaded: false
};

export const fetchPreviews = createAsyncThunk(
  'previews/fetch',
  async () => {
    // 
    const response = await fetch(`http://localhost:7071/api/recipe-previews`);
      if (response.ok) {
        return response.json();
      } else {
        return [];
      }
  }
);

export const previewsSlice = createSlice({
  name: 'previews',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchPreviews.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPreviews.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.previews = action.payload;
    })
    .addCase(fetchPreviews.rejected, (state, action) => {
      state.loading = false;
    })
  }
});

export const selectPreviews = (state: RootState) => state.previews.previews;
export const selectPreviewsLoading = (state: RootState) => state.previews.loading;
export const selectPreviewsLoaded = (state: RootState) => state.previews.loaded;

export default previewsSlice.reducer;