import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import { PokemonResponse, SimplePokemon } from '../interfaces/pokemon.interface';
import { Pokemon } from '../../pages/pokemon-id/interface/pokemon.interface';

// let url  = 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=20'
let url = 'https://pokeapi.co/api/v2/pokemon';

@Service()
export class PokemonService {



    private httpClient = inject(HttpClient);



    public loadPage(page: number): Observable<SimplePokemon[]> {
        // console.log( {page})
        if (page != 0) {
            page = page - 1;
        }

        page = Math.max(0, page);
        // console.log( {page})

        return this.httpClient.get<PokemonResponse>(`${url}?offset=${page * 20}&limit=20`).pipe(
            delay(1500),
            map((response: PokemonResponse) => {

                const simplePokemons: SimplePokemon[] = response.results.map((pokemon: any) => {
                    const id = pokemon.url.split('/').filter(Boolean).pop();
                    // const id = pokemon.url.split('/').at(-2) || '';
                    return { name: pokemon.name, id };
                })
                return simplePokemons;
                // return response.results.map((pokemon: any) => {
                //     const id = pokemon.url.split('/').filter(Boolean).pop();
                //     return { name: pokemon.name, id };
                // });
            }),
            // tap((pokemons) => console.log('pokemons', pokemons))
        );
    }


    getPokemonById(id: string): Observable<Pokemon> {
        return this.httpClient.get<Pokemon>(`${url}/${id}`).pipe(
            delay(1500),
            tap((pokemon) =>{
              // console.log('pokemon', pokemon)
            })
        );
    }
}
