import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface LeaveRequest {
  id: number;
  username: string;
  departmentName: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  reason: string;
  managerComment?: string;
}

@Component({
  selector: 'app-manager-leave',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './manager-leave.component.html',
  styleUrl: './manager-leave.component.scss'
})
export class ManagerLeaveComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];

  constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.loadLeaveRequests();
}

loadLeaveRequests() {
  this.http.get<LeaveRequest[]>('http://localhost:8080/api/api/leave-requests/pending')
    .subscribe(data => {
      this.leaveRequests = data.map(req => ({
        ...req,
        managerComment: req.managerComment || ''
      }));
    });

}


approveLeave(req: any, comment: string | undefined) {
  const body = {
    status: 'Approved',
    managerComment: comment
  };

  this.http.put(`http://localhost:8080/api/admin/update-leave-status/${req.id}`, body)
    .subscribe({
      next: res => {
        alert('Approved');
        this.removeRequest(req.id);
        this.loadLeaveRequests();
      },
      error: err => {
        alert('Approved failed');
      }
    });
}

rejectLeave(req: any, comment: string | undefined) {
  const body = {
    status: 'Rejected',
    managerComment: comment
  };

  this.http.put(`http://localhost:8080/api/admin/update-leave-status/${req.id}`, body)
    .subscribe({
      next: res => {
        alert('Rejected');
        this.removeRequest(req.id);
        this.loadLeaveRequests();
      },
      error: err => {
        alert('Rejected failed');
      }
    });
}


  removeRequest(req: LeaveRequest) {
    this.leaveRequests = this.leaveRequests.filter(r => r.id !== req.id);
  }

  getDayCount(start: string, end: string): number {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diff = (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
    return Math.round(diff + 1);
  }
}