import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDuesComponent } from './my-dues.component';

describe('MyDuesComponent', () => {
  let component: MyDuesComponent;
  let fixture: ComponentFixture<MyDuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
