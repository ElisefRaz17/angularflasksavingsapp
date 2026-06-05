import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetEmail } from './reset-email';

describe('ResetEmail', () => {
  let component: ResetEmail;
  let fixture: ComponentFixture<ResetEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
