import { TestBed } from '@angular/core/testing';

import { InitDishService } from './init-dish.service';

describe('InitDishService', () => {
  let service: InitDishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
