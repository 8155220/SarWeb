import { TestBed, inject } from '@angular/core/testing';

import { PrivilegiosService } from './privilegios.service';

describe('PrivilegiosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivilegiosService]
    });
  });

  it('should be created', inject([PrivilegiosService], (service: PrivilegiosService) => {
    expect(service).toBeTruthy();
  }));
});
