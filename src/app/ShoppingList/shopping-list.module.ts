import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListEditComponent } from "./shopping-list/shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingComponent } from "./shopping.component";

@NgModule({
  declarations: [
    ShoppingListEditComponent,
    ShoppingComponent,
    ShoppingListComponent,
  ],
  imports: [SharedModule, ShoppingListRoutingModule],
})
export class ShoppingListModule {}
