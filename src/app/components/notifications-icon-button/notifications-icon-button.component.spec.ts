import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsIconButtonComponent } from './notifications-icon-button.component';

describe('NotificationsIconButtonComponent', () => {
  let component: NotificationsIconButtonComponent;
  let fixture: ComponentFixture<NotificationsIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsIconButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
