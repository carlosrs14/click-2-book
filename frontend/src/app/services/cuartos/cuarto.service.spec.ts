import { TestBed } from '@angular/core/testing';

import { CuartoService } from './cuarto.service';

describe('CuartoService', () => {
  let service: CuartoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuartoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
