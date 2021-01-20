import { TestBed } from '@angular/core/testing';

import { CustomResolverService } from './custom-resolver.service';

describe('CustomResolverService', () => {
  let service: CustomResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
