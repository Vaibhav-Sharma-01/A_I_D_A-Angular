import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWidgetsDialogComponent } from './add-widgets-dialog.component';

describe('AddWidgetsDialogComponent', () => {
  let component: AddWidgetsDialogComponent;
  let fixture: ComponentFixture<AddWidgetsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWidgetsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWidgetsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
