import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCreditScoreComponent } from './generate-credit-score.component';

describe('GenerateCreditScoreComponent', () => {
  let component: GenerateCreditScoreComponent;
  let fixture: ComponentFixture<GenerateCreditScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCreditScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCreditScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
