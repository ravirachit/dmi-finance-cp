import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperianTermsComponent } from './experian-terms.component';

describe('ExperianTermsComponent', () => {
  let component: ExperianTermsComponent;
  let fixture: ComponentFixture<ExperianTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperianTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperianTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
