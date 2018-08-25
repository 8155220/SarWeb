import { TestBed, inject } from '@angular/core/testing';

import { VoluntarioService } from './voluntario.service';

describe('VoluntarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoluntarioService]
    });
  });

  it('should be created', inject([VoluntarioService], (service: VoluntarioService) => {
    expect(service).toBeTruthy();
  }));
});
