import { TestBed } from '@angular/core/testing';
import { Metatags } from './metatags.service';

describe('Metatags', () => {
  let service: Metatags;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Metatags);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
