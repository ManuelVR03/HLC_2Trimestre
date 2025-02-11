import { Component, OnInit } from '@angular/core';
import { PokemonServiceProvider } from '../providers/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../modelo/Pokemon';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public pokemons = new Array<Pokemon>();

  constructor(private pokemonService: PokemonServiceProvider,
    private Http: HttpClient) {}

  ngOnInit(): void {
    
    this.loadPokemons();

  }

  loadPokemons() {
    this.pokemonService.getPokemons(0)
      .then((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        console.log(this.pokemons);
      })
      .catch((error: string) => {
        console.log(error);
      });
      this.pokemons = this.pokemons.filter(pokemon => pokemon.imagen !== null);
  } 

}
