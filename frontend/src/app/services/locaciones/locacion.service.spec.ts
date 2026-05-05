import { TestBed } from '@angular/core/testing';

import { LocacionService } from './locacion.service';

describe('LocacionService', () => {
  let service: LocacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
