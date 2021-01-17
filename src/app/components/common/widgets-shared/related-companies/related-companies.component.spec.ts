import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCompaniesComponent } from './related-companies.component';

describe('RelatedCompaniesComponent', () => {
  let component: RelatedCompaniesComponent;
  let fixture: ComponentFixture<RelatedCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
