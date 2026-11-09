import { Component, input, computed, effect, inject } from '@angular/core';
import { SimplePokemon } from '../../interfaces/pokemon.interface';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-pokemon-card',
  styleUrl: './pokemon-card.scss',
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {

  public pokemon = input.required<SimplePokemon>();
  public pokeImg = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`);
  private router = inject(Router);


  logEffect = effect(() => {
    // console.log('pokemon changed', this.pokemon()); // Se ejecuta cada vez que cambia el input  o una señal que se use dentro del effect. En este caso, cuando cambia el input `pokemon`.
  });


  goto(id: string) {
    // console.log('goto', id);
    this.router.navigate(['/pokemon-detail', id]);
  }

}
