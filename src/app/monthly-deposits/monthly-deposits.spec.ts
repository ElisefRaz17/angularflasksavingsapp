import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDeposits } from './monthly-deposits';

describe('MonthlyDeposits', () => {
  let component: MonthlyDeposits;
  let fixture: ComponentFixture<MonthlyDeposits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyDeposits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyDeposits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
