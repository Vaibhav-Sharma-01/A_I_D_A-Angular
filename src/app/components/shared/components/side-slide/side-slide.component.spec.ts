import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideSlideComponent } from './side-slide.component';

describe('SideSlideComponent', () => {
  let component: SideSlideComponent;
  let fixture: ComponentFixture<SideSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
