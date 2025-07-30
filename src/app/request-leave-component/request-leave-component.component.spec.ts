import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLeaveComponentComponent } from './request-leave-component.component';

describe('RequestLeaveComponentComponent', () => {
  let component: RequestLeaveComponentComponent;
  let fixture: ComponentFixture<RequestLeaveComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestLeaveComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestLeaveComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
