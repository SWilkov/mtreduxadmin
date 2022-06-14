import { BaseImage } from "./base-image.model";

export interface RecipePreview {
  id: number;
  name: string;
  description: string;
  season: string;
  image: BaseImage;
  slug: string;
}