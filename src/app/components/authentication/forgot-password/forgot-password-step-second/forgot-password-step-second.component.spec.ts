import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordStepSecondComponent } from './forgot-password-step-second.component';

describe('ForgotPasswordStepSecondComponent', () => {
  let component: ForgotPasswordStepSecondComponent;
  let fixture: ComponentFixture<ForgotPasswordStepSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordStepSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordStepSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
