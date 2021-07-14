import { TestBed } from '@angular/core/testing';

import { NotifyService } from './notify.service';

describe('ToastService', () => {
  let service: NotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
