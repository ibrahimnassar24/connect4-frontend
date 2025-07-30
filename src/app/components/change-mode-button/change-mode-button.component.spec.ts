import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeModeButtonComponent } from './change-mode-button.component';

describe('ChangeModeButtonComponent', () => {
  let component: ChangeModeButtonComponent;
  let fixture: ComponentFixture<ChangeModeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeModeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeModeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
