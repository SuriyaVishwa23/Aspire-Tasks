import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeardcareComponent } from './beardcare.component';

describe('BeardcareComponent', () => {
  let component: BeardcareComponent;
  let fixture: ComponentFixture<BeardcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeardcareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeardcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
