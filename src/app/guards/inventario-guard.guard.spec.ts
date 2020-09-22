import { TestBed } from '@angular/core/testing';

import { InventarioGuardGuard } from './inventario-guard.guard';

describe('InventarioGuardGuard', () => {
  let guard: InventarioGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InventarioGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
