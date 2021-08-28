import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { RecipeDetailComponent } from "./RecipeBook/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./RecipeBook/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./RecipeBook/recipe-start/recipe-start.component";
import { RecipeComponent } from "./RecipeBook/recipe.component";
import { RecipesResolverService } from "./shared/recipes-resolver.service";
import { ShoppingListComponent } from "./ShoppingList/shopping-list/shopping-list.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent,
  },
  {
    path: "auth",
    component: AuthComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
