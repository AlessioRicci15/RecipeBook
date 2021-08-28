import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../shared/store/app.reducer";
import * as RecipeActions from "../shared/store/recipe.actions";
import { Recipe } from "./recipe.model";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.css"],
})
export class RecipeComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
}
