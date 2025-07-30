import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistoryComponentComponent } from './leave-history-component.component';

describe('LeaveHistoryComponentComponent', () => {
  let component: LeaveHistoryComponentComponent;
  let fixture: ComponentFixture<LeaveHistoryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveHistoryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveHistoryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
