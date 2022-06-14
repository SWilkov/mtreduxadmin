import internal from "stream";
import { Method } from "./method.model";
import { RecipeItem } from "./recipe-item.model";

export interface Part {
  id: number;
  name: string;
  note: string;
  order: number;
  recipeId: number;
  methods: Method[];
  recipeItems: RecipeItem[];
}