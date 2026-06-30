import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeposit } from './add-deposit';

describe('AddDeposit', () => {
  let component: AddDeposit;
  let fixture: ComponentFixture<AddDeposit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeposit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeposit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
