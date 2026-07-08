import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMenuComponent } from './filter-menu-component';

describe('FilterMenuComponent', () => {
  let component: FilterMenuComponent;
  let fixture: ComponentFixture<FilterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterMenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
