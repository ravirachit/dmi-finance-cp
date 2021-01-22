import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperianHistoryComponent } from './experian-history.component';

describe('ExperianHistoryComponent', () => {
  let component: ExperianHistoryComponent;
  let fixture: ComponentFixture<ExperianHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperianHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperianHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
