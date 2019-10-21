import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AppComponent } from './app.component';

import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import {MatButtonModule, MatCardModule, MatGridListModule, MatListModule} from "@angular/material";
import { DishdetailComponent } from './dishdetail/dishdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
