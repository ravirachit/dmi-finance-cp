import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoanAppComponent } from './new-loan-app.component';

describe('NewLoanAppComponent', () => {
  let component: NewLoanAppComponent;
  let fixture: ComponentFixture<NewLoanAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLoanAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLoanAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
