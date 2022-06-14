import { BaseImage } from "./base-image.model";
import { Note } from "./note.model";
import { Part } from "./part.model";
import { Season } from "./season.model";

export interface Recipe {
  id: number;
  name: string;
  shortDescription: string;
  makes: string;
  serves: string;
  slug: string;
  body: string;
  caption: string;
  cookingTime: number;
  prepTime: number;
  season: Season | null;
  notes: Note[];
  parts: Part[];
  images: BaseImage[];
}