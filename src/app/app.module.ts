import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core.module";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "./shared/shared.module";
import * as fromApp from "./shared/store/app.reducer";
import { AuthEffects } from "./shared/store/auth.effects";
import { RecipeEffects } from "./shared/store/recipe.effects";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    CoreModule,
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    SharedModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreModule.forRoot(fromApp.appReducer),
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
