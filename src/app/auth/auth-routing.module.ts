import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";

const appRoutes: Routes = [{ path: "", component: AuthComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
