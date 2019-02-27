import { TestBed } from '@angular/core/testing';

import { NomicsService } from './nomics.service';

describe('NomicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NomicsService = TestBed.get(NomicsService);
    expect(service).toBeTruthy();
  });
});
