import { TestBed } from '@angular/core/testing';

import { HttpProviderService } from './http-provider.service';

describe('HttpProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpProviderService = TestBed.get(HttpProviderService);
    expect(service).toBeTruthy();
  });
});
