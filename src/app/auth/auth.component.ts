import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as fromApp from "../shared/store/app.reducer";
import * as AuthActions from "../shared/store/auth.actions";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild("form") form;

  private storeSub: Subscription;

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSub = this.store.select("auth").subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearForm();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: form.value.email,
          password: form.value.password,
        })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: form.value.email,
          password: form.value.password,
        })
      );
    }

    this.clearForm();
  }

  clearForm() {
    this.form.reset();
  }

  onHandelError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
}
