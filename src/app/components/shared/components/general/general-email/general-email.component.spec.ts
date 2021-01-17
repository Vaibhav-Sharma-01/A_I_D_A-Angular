import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEmailComponent } from './general-email.component';

describe('GeneralEmailComponent', () => {
  let component: GeneralEmailComponent;
  let fixture: ComponentFixture<GeneralEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
