import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonDetailsComponent } from './pokemonDetails/pokemon-details.component';

@NgModule({
  declarations: [AppComponent, PokemonsComponent, PokemonDetailsComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
})
export class AppModule {}
