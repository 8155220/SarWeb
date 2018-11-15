import { TestBed, inject } from '@angular/core/testing';

import { AscensoService } from './ascenso.service';

describe('AscensoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AscensoService]
    });
  });

  it('should be created', inject([AscensoService], (service: AscensoService) => {
    expect(service).toBeTruthy();
  }));
});
