import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordStepFirstComponent } from './forgot-password-step-first.component';

describe('ForgotPasswordStepFirstComponent', () => {
  let component: ForgotPasswordStepFirstComponent;
  let fixture: ComponentFixture<ForgotPasswordStepFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordStepFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordStepFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
