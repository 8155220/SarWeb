import { TestBed, inject } from '@angular/core/testing';

import { CompaniaService } from './compania.service';

describe('CompaniaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompaniaService]
    });
  });

  it('should be created', inject([CompaniaService], (service: CompaniaService) => {
    expect(service).toBeTruthy();
  }));
});
