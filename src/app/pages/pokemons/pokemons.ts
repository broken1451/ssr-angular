import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonSkeleton } from './ui/pokemon-skeleton/pokemon-skeleton';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PokemonService } from '../../pokemons/services/PokemonService';
import { SimplePokemon } from '../../pokemons/interfaces/pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { Title } from '@angular/platform-browser';


@Component({
  imports: [PokemonList, PokemonSkeleton],
  selector: 'app-pokemons',
  styleUrl: './pokemons.scss',
  templateUrl: './pokemons.html',
})
export class Pokemons implements OnInit, OnDestroy  {

  public pokemons = signal<SimplePokemon[]>([]);
  public page = signal<number>(0);
  public page2 = signal<number>(3);
  private title = inject(Title);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public currentPage = toSignal<number>(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => isNaN(Number(page)) ? 1 : Number(page)),
      map((page) => Math.max(1, page))
    )
  )

  /**
   * QUÉ: Signal que indica si los datos todavía se están cargando.
   * POR QUÉ: Usamos un signal para que Angular detecte el cambio automáticamente
   *          y vuelva a pintar la vista (mostrar skeleton o la lista).
   * PARA QUÉ: Mostrar el componente <pokemon-skeleton> mientras es `true`
   *           y la lista de pokémons cuando pase a `false`.
   */
  public isLoading = signal(true);

  /**
   * QUÉ: Referencia a la aplicación Angular (ApplicationRef).
   * POR QUÉ: ApplicationRef expone el observable `isStable`, que indica si la app
   *          ya no tiene tareas pendientes (timers, peticiones HTTP, promesas...).
   * PARA QUÉ: En SSR, el servidor espera a que la app esté "estable" antes de
   *           enviar el HTML al cliente. Si hay un setTimeout pendiente, la app
   *           NO está estable y el servidor tarda más en responder.
   */
  private appRef = inject(ApplicationRef);

  /**
   * QUÉ: Alias de appRef (el `$` es convención para algo relacionado con observables).
   * PARA QUÉ: Acceder de forma más legible a `isStable`.
   */
  private $appState = this.appRef;

  /**
   * QUÉ: Guarda la suscripción a `isStable`.
   * POR QUÉ: Necesitamos la MISMA suscripción para poder cancelarla luego.
   * PARA QUÉ: Evitar fugas de memoria (memory leaks) al destruir el componente.
   */
  private appStableSubscription?: Subscription;


  private pokemonService = inject(PokemonService);


  /**
   * QUÉ: Constructor del componente.
   * POR QUÉ: Nos suscribimos lo antes posible para observar desde el inicio
   *          cuándo la app pasa de "no estable" a "estable".
   * PARA QUÉ: Depurar/aprender en consola cómo afecta el setTimeout a la estabilidad.
   */
  constructor() {
    this.appStableSubscription = this.waitForAppStable();
  }

  /**
   * QUÉ: Hook de inicialización del componente.
   * POR QUÉ: En SSR, todo lo que se ejecute aquí forma parte del render en el
   *          servidor; el cliente recibe la respuesta cuando la app queda estable.
   * PARA QUÉ: Simular una carga de 5 segundos; al terminar, se oculta el
   *           skeleton. Mientras el timer exista, `isStable` será `false`.
   */
  async ngOnInit(): Promise<void> {
    this.getPokemons(this.page());
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }

  /**
   * QUÉ: Hook que se ejecuta cuando el componente se destruye.
   * POR QUÉ: Las suscripciones a observables no se cancelan solas.
   * PARA QUÉ: Cancelar la suscripción original y liberar memoria.
   *           (Antes se llamaba a waitForAppStable().unsubscribe(), lo cual creaba
   *           una suscripción NUEVA y dejaba viva la original.)
   */
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.appStableSubscription?.unsubscribe();
  }

  /**
   * QUÉ: Se suscribe al observable `isStable` de la aplicación.
   * POR QUÉ: Permite ver en consola cuándo Angular considera la app estable.
   * PARA QUÉ: Entender el ciclo de SSR/hidratación. Devuelve la Subscription
   *           para poder cancelarla después.
   */
  waitForAppStable(): Subscription {
    return this.$appState.isStable.subscribe((isStable) => {
      // console.log('isStable', isStable);
    });
  }


  getPokemons(page: number = 0) {
    const loadTopage = this.currentPage()! + page;
    
    this.isLoading.set(true);
    // console.log({loadTopage})
    this.pokemonService.loadPage(loadTopage).pipe(
      tap(()=> {
        this.router.navigate([], {
          queryParams: { page: loadTopage },
          // queryParamsHandling: 'merge',
        });
      }),
      tap(()=>{
        this.title.setTitle(`Listado de pokemons - Página ${loadTopage}`);
      })
    ).subscribe((pokemons) =>{
      // console.log('on init')
      this.pokemons.set(pokemons);
      this.isLoading.set(false);
    })
  }
  
  
  // getPokemons(page: number) {
  //   this.pokemonService.loadPage(this.page()).subscribe((pokemons) =>{
  //     console.log('on init')
  //     this.pokemons.set(pokemons);
  //   })
  // }
  previousPage( page: number) {
    // console.log('previousPage', page)
    this.page.update((currentPage) => Math.max(0, currentPage - (+1)));
    // console.log('previousPage', this.page())
    this.getPokemons(this.page());
  }

  nextPage( page: number){
    // console.log('nextPage', page)
    this.page.update((currentPage) => currentPage + 1);
    // console.log('nextPage', this.page())
    this.getPokemons(this.page());

  }
  // getPokemons(page: number) {
  //   this.pokemonService.loadPage(this.page()).subscribe((pokemons) =>{
  //     console.log('on init')
  //     this.pokemons.set(pokemons);
  //   })
  // }
}