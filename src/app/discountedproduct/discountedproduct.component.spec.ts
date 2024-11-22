import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedproductComponent } from './discountedproduct.component';

describe('DiscountedproductComponent', () => {
  let component: DiscountedproductComponent;
  let fixture: ComponentFixture<DiscountedproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountedproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountedproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
