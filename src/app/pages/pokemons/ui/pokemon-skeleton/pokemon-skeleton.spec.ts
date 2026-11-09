import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonSkeleton } from './pokemon-skeleton';

describe('PokemonSkeleton', () => {
  let component: PokemonSkeleton;
  let fixture: ComponentFixture<PokemonSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
