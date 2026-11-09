import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonId } from './pokemon-id';

describe('PokemonId', () => {
  let component: PokemonId;
  let fixture: ComponentFixture<PokemonId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonId],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
