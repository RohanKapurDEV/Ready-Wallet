import { TestBed } from '@angular/core/testing';

import { MessariService } from './messari.service';

describe('MessariService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessariService = TestBed.get(MessariService);
    expect(service).toBeTruthy();
  });
});
