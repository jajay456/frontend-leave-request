import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-leave-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgbDatepickerModule],
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

  isSubmitting = false;

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);


  formatDate(dateObj: any): string {
    if (!dateObj) return '';
    const year = dateObj.year;
    const month = String(dateObj.month).padStart(2, '0');
    const day = String(dateObj.day).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

 submitLeave() {
  if (isPlatformBrowser(this.platformId)) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่');
      return;
    }

    const payload = {
      userId: +userId,
      leaveTypeId: this.leaveType,
      startDate: this.startDate,
      endDate: this.endDate,
      reason: this.reason
    };

    this.http.post('http://localhost:8080/api/create-leave-requests', payload)
      .subscribe({
        next: () => alert('ส่งคำขอลาสำเร็จ'),
        error: (err) => {
          console.error('❌ ส่งคำขอลาไม่สำเร็จ:', err);
          alert('เกิดข้อผิดพลาดในการส่งคำขอลา');
        }
      });
  } else {
    console.warn('ไม่สามารถเข้าถึง localStorage ได้จากฝั่งเซิร์ฟเวอร์');
  }
}


  cancel() {
    this.leaveType = null;
    this.startDate = undefined;
    this.endDate = undefined;
    this.reason = '';
  }
}
