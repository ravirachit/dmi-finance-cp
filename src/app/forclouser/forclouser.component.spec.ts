import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForclouserComponent } from './forclouser.component';

describe('ForclouserComponent', () => {
  let component: ForclouserComponent;
  let fixture: ComponentFixture<ForclouserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForclouserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForclouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
