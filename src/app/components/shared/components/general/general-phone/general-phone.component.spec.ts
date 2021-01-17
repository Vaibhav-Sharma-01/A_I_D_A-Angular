import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPhoneComponent } from './general-phone.component';

describe('GeneralPhoneComponent', () => {
  let component: GeneralPhoneComponent;
  let fixture: ComponentFixture<GeneralPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
