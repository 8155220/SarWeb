import { TestBed, inject } from '@angular/core/testing';

import { MeritoService } from './merito.service';

describe('MeritoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeritoService]
    });
  });

  it('should be created', inject([MeritoService], (service: MeritoService) => {
    expect(service).toBeTruthy();
  }));
});
