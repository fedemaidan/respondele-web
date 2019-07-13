import { TestBed } from '@angular/core/testing';

import { MensajeroService } from './mensajero.service';

describe('MensajeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensajeroService = TestBed.get(MensajeroService);
    expect(service).toBeTruthy();
  });
});
