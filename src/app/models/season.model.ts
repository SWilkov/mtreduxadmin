import { RecipePreview } from "./recipe-preview.model";
import { Recipe } from "./recipe.model";

export interface Season {
  id: number;
  iconUrl: string;
  name: string;
  description: string;
  recipes: RecipePreview[];
}