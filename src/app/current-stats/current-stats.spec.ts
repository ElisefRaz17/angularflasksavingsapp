import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStats } from './current-stats';

describe('CurrentStats', () => {
  let component: CurrentStats;
  let fixture: ComponentFixture<CurrentStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
