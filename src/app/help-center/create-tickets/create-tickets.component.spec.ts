import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketsComponent } from './create-tickets.component';

describe('CreateTicketsComponent', () => {
  let component: CreateTicketsComponent;
  let fixture: ComponentFixture<CreateTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
