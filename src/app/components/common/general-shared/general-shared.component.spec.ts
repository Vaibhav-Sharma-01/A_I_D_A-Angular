import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSharedComponent } from './general-shared.component';

describe('GeneralSharedComponent', () => {
  let component: GeneralSharedComponent;
  let fixture: ComponentFixture<GeneralSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
