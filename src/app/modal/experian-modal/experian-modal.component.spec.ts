import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperianModalComponent } from './experian-modal.component';

describe('ExperianModalComponent', () => {
  let component: ExperianModalComponent;
  let fixture: ComponentFixture<ExperianModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperianModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperianModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
