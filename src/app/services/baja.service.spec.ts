import { TestBed, inject } from '@angular/core/testing';

import { BajaService } from './baja.service';

describe('BajaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BajaService]
    });
  });

  it('should be created', inject([BajaService], (service: BajaService) => {
    expect(service).toBeTruthy();
  }));
});
