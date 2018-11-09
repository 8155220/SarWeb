import { TestBed, inject } from '@angular/core/testing';

import { IncorporacionService } from './incorporacion.service';

describe('IncorporacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncorporacionService]
    });
  });

  it('should be created', inject([IncorporacionService], (service: IncorporacionService) => {
    expect(service).toBeTruthy();
  }));
});
