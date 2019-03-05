import { TestBed } from '@angular/core/testing';

import { NetworkvizService } from './networkviz.service';

describe('NetworkvizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkvizService = TestBed.get(NetworkvizService);
    expect(service).toBeTruthy();
  });
});
