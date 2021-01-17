import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedContactComponent } from './associated-contact.component';

describe('AssociatedContactComponent', () => {
  let component: AssociatedContactComponent;
  let fixture: ComponentFixture<AssociatedContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatedContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
