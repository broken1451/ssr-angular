import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from './interface/pokemon.interface';
import { PokemonService } from '../../pokemons/services/PokemonService';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  imports: [],
  selector: 'app-pokemon-id',
  styleUrl: './pokemon-id.scss',
  templateUrl: './pokemon-id.html',
})
export class PokemonId implements OnInit {

  public pokemon = signal<Pokemon | null>(null)
  private activateRoute = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private title = inject(Title);
  private meta = inject(Meta);

  constructor() {
  }


  ngOnInit(): void {
    this.activateRoute.params.pipe(
      map((params) => {
        const id = params['id'];
        if (!id) return;
        return id;
      }),
      switchMap((id) => this.getPokemonById(id)),
      tap((pokemon) => {
        if (pokemon) {
          const pagetitle = `${pokemon.id} - ${pokemon.name}`;
          this.title.setTitle(pagetitle);
          this.meta.updateTag({ name: 'description', content: `Information about ${pokemon.name}` }); // si no existe la etiqueta, la crea. Si existe, la actualiza.
          this.meta.updateTag({ name: 'og:title', content: pagetitle }); // si no existe la etiqueta, la crea. Si existe, la actualiza.
          this.meta.updateTag({ name: 'og:description', content: `Information about ${pokemon.name}` }); // si no existe la etiqueta, la crea. Si existe, la actualiza.
          this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` }); // si no existe la etiqueta, la crea. Si existe, la actualiza.
        }
      })
    ).subscribe((pokemon) => {
      // console.log('pokemon', pokemon);
      this.pokemon.set(pokemon);
    })

  }


  getPokemonById(id: string) {
    return this.pokemonService.getPokemonById(id)
  }
}
