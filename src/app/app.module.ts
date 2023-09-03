import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { BeerListComponent } from './components/beer-list/beer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    BeerListComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
