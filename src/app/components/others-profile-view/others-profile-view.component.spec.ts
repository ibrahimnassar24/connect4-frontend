import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersProfileViewComponent } from './others-profile-view.component';

describe('OthersProfileViewComponent', () => {
  let component: OthersProfileViewComponent;
  let fixture: ComponentFixture<OthersProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OthersProfileViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
