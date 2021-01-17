import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsSharedComponent } from './widgets-shared.component';

describe('WidgetsSharedComponent', () => {
  let component: WidgetsSharedComponent;
  let fixture: ComponentFixture<WidgetsSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
