import { TestBed } from '@angular/core/testing';

import { PunkAPIService } from './punk-api.service';

describe('PunkAPIService', () => {
  let service: PunkAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PunkAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
