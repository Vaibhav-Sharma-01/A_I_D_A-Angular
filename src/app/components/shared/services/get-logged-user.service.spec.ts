import { TestBed } from '@angular/core/testing';

import { GetLoggedUserService } from './get-logged-user.service';

describe('GetLoggedUserService', () => {
  let service: GetLoggedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLoggedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
