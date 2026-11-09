import { Component, input } from '@angular/core';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { SimplePokemon } from '../../interfaces/pokemon.interface';

@Component({
  imports: [PokemonCard],
  selector: 'app-pokemon-list',
  styleUrl: './pokemon-list.scss',
  templateUrl: './pokemon-list.html',
})
export class PokemonList {

  public pokemons = input.required<SimplePokemon[]>();

}
