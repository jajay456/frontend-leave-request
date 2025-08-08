import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, inject, OnInit,PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-leave-history-component',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './leave-history-component.component.html',
  styleUrl: './leave-history-component.component.scss'
})
export class LeaveHistoryComponentComponent implements OnInit {
  http = inject(HttpClient);
  leaveRequests: any[] = [];
  platformId = inject(PLATFORM_ID);
  userId!: number;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; 
    }

    const storedId = localStorage.getItem('userId');
    if (!storedId) {
      alert('ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่');
      return;
    }

    this.userId = +storedId;
    this.http
      .get<any[]>(`http://localhost:8080/api/get-leave-requests-by-user/${this.userId}`)
      .subscribe(data => {
        this.leaveRequests = data;
      });
  }


  formatThaiDateRange(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const startText = startDate.getDate();
    const endText = endDate.getDate();
    const month = startDate.toLocaleString('th-TH', { month: 'short' });
    const year = startDate.getFullYear() + 543;

    if (startDate.getTime() === endDate.getTime()) {
      return `${startText} ${month} ${year}`;
    }

    return `${startText}-${endText} ${month} ${year}`;
  }

  calculateDays(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
}
