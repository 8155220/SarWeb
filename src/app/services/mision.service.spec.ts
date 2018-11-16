import { TestBed, inject } from '@angular/core/testing';

import { MisionService } from './mision.service';

describe('MisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MisionService]
    });
  });

  it('should be created', inject([MisionService], (service: MisionService) => {
    expect(service).toBeTruthy();
  }));
});
