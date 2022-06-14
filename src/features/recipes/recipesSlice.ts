import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../app/models/recipe.model";
import { RootState } from "../../app/store";

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  loaded: boolean;
  saving: boolean;
}

const initialState: RecipeState = {
  recipes: [],
  loaded: false,
  loading: false,
  saving: false
};

export interface FetchRecipeProps {
  slug: string;
}

export interface SaveRecipeProps {
  recipe: Recipe;
}

export const fetchRecipe = createAsyncThunk(
  'recipes/fetch',
  async ({slug}: FetchRecipeProps) => {
    // 
    try {
    const response = await fetch(`http://localhost:7071/api/recipe/${slug}`);
      if (response.ok) {
        return (await response.json());
      } else {
        return [];
      }
    }
    catch(error: any) {
      console.log(error.message);
    }
  }
);

export const saveRecipe = createAsyncThunk(
  'recipes/save',
  async ({recipe}: SaveRecipeProps) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      };
      const response = await fetch(`http://localhost:7071/api/save-recipe`, options);
      if (response.ok) {
        return await response.json();
        
      }
    }
    catch(error: any) {
      console.log(error.message);
      return null;
    }
  }
)

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipe.pending, (state) => {
      state.loading = true;
      state.loaded = false;
    })
    .addCase(fetchRecipe.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      
      const index = state.recipes.findIndex(x => x.id === action.payload?.id);
      if (index === -1) {
        state.recipes = [...state.recipes, action.payload];
      }
    })
    .addCase(fetchRecipe.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(saveRecipe.pending, (state) => {
      state.saving = true
    })
    .addCase(saveRecipe.fulfilled, (state, action) => {
      state.saving = false;
      const index = state.recipes.findIndex(x => x.id === action.payload.id);
      if (index > -1) {
        state.recipes[index] = action.payload
      }      
    })
    .addCase(saveRecipe.rejected, (state, action) => {
      state.saving = false
    })
  }
});

export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectRecipeLoading = (state: RootState) => state.recipes.loading;
export const selectRecipeLoaded = (state: RootState) => state.recipes.loaded;
const recipeState = (state: RootState) => state.recipes;

export const selectRecipe = (slug: string) => createSelector(
   recipeState, 
   (state) => state.recipes
     ? state.recipes.find(x => x.slug.toLowerCase() === slug.toLowerCase()) : null
);

export const selectRecipeSaving = createSelector(
  recipeState,
  (state) => state.saving
);

export default recipesSlice.reducer;