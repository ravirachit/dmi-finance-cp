import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeletterComponent } from './welcomeletter.component';

describe('WelcomeletterComponent', () => {
  let component: WelcomeletterComponent;
  let fixture: ComponentFixture<WelcomeletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
