import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromRecipe from "./recipe.reducer";
import * as fromShoppingList from "./shopping-list.reducer";

export interface AppState {
  shoppingList: fromShoppingList.State;
  recipe: fromRecipe.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  recipe: fromRecipe.recipeReducer,
  auth: fromAuth.authReducer,
};
