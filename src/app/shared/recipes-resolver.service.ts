import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { Recipe } from "../RecipeBook/recipe.model";
import * as fromApp from "../shared/store/app.reducer";
import * as RecipeActions from "../shared/store/recipe.actions";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root",
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private recipesService: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve() {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      this.store.select("recipe").pipe(
        take(1),
        map((recipesState) => {
          return recipesState.recipes;
        }),
        switchMap((recipes) => {
          if (recipes.length === 0) {
            this.store.dispatch(new RecipeActions.FetchRecipes());
            return this.actions$.pipe(
              ofType(RecipeActions.SET_RECIPES),
              take(1)
            );
          } else {
            return of(recipes);
          }
        })
      );
    }
    return recipes;
  }
}
