import { TestBed } from '@angular/core/testing';

import { DataCarrierService } from './data-carrier.service';

describe('DataCarrierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataCarrierService = TestBed.get(DataCarrierService);
    expect(service).toBeTruthy();
  });
});
