import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceDisplayComponentComponent } from './leave-balance-display-component.component';

describe('LeaveBalanceDisplayComponentComponent', () => {
  let component: LeaveBalanceDisplayComponentComponent;
  let fixture: ComponentFixture<LeaveBalanceDisplayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveBalanceDisplayComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveBalanceDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
