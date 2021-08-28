import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imgPath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    desc: string,
    imgPath: string,
    ingredients: Ingredient[]
  ) {
    this.description = desc;
    this.imgPath = imgPath;
    this.name = name;
    this.ingredients = ingredients;
  }
}
