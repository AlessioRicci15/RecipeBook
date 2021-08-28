import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as fromApp from "../../../shared/store/app.reducer";
import * as ShoppingListAction from "../../../shared/store/shopping-list.actions";

@Component({
  selector: "app-shopping-list-edit",
  templateUrl: "./shopping-list-edit.component.html",
  styleUrls: ["./shopping-list-edit.component.css"],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") shoppingListForm: NgForm;
  subscriptions: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnDestroy(): void {
    this.onClear();
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions = this.store
      .select("shoppingList")
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex >= 0) {
          this.editedItem = stateData.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListAction.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.shoppingListForm.reset();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    this.onClear();
  }
}
