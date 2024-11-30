import { TestBed } from '@angular/core/testing';

import { NgxFormManagerService } from './ngx-form-manager.service';

describe('NgxFormManagerService', () => {
  let service: NgxFormManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFormManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
