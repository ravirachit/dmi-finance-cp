import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListDetailsComponent } from './category-list-details.component';

describe('CategoryListDetailsComponent', () => {
  let component: CategoryListDetailsComponent;
  let fixture: ComponentFixture<CategoryListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
