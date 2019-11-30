import { TestBed } from '@angular/core/testing';

import { WishlistHandlerService } from './wishlist-handler.service';

describe('WishlistHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WishlistHandlerService = TestBed.get(WishlistHandlerService);
    expect(service).toBeTruthy();
  });
});
