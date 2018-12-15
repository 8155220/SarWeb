import { TestBed, inject } from '@angular/core/testing';

import { CanAccessService } from './can-access.service';

describe('CanAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanAccessService]
    });
  });

  it('should be created', inject([CanAccessService], (service: CanAccessService) => {
    expect(service).toBeTruthy();
  }));
});
