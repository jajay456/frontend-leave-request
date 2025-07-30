import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {  HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-request-leave-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgbDatepickerModule,  ],
  templateUrl: './request-leave-component.component.html',
  styleUrl: './request-leave-component.component.scss'
})
export class RequestLeaveComponentComponent {
  leaveType: number | null = null;
  leaveTypes = [
    { id: 1, label: 'ลาพักร้อน' },
    { id: 2, label: 'ลากิจ' },
    { id: 3, label: 'ลาป่วย' }
  ];
  startDate: any;
  endDate: any;
  reason = '';

  constructor(private http: HttpClient) {}

  submitLeave() {
  const payload = {
    userId: 1, 
    leaveTypeId: this.leaveType, 
    startDate: this.startDate,
    endDate: this.endDate,
    reason: this.reason
  };

      this.http.post('http://localhost:8080/api/create-leave-requests', payload)
      .subscribe({
        next: res => {
          alert('ส่งคำขอลาสำเร็จ');
        },
        error: err => {
          alert('เกิดข้อผิดพลาดในการส่งคำขอลา');
        }
      });
  }
  cancel() {
    this.leaveType = null;
    this.startDate = undefined;
    this.endDate = undefined;
    this.reason = '';
  }


}
