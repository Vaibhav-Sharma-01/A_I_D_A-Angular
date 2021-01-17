import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AidaLoaderComponent } from './aida-loader.component';

describe('AidaLoaderComponent', () => {
  let component: AidaLoaderComponent;
  let fixture: ComponentFixture<AidaLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AidaLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AidaLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
