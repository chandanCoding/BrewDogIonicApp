import { TestBed } from '@angular/core/testing';

import { ToolkitService } from './toolkit.service';

describe('ToolkitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolkitService = TestBed.get(ToolkitService);
    expect(service).toBeTruthy();
  });
});
