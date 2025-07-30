import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LeaveBalanceType {
  leaveTypeId: number;
  leaveTypeName: string;
  remainingDays: number;
}

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.scss'
})
export class DashboardComponentComponent implements OnInit{
  http = inject(HttpClient);
  userId: number = 1;
  remainingDays: number = 0;
  leaveDays: number = 0;
  countPennding:number = 0;
  leaveBalances: LeaveBalanceType[] = [];

  ngOnInit(): void {
  this.http.get<number>(`http://localhost:8080/api/total-remaining-days/${this.userId}`)
  .subscribe(days => {
    this.remainingDays = days;
  });
  this.http.get<number>(`http://localhost:8080/api/total-leave-days/${this.userId}`)
  .subscribe(days => {
    this.leaveDays = days;
  });
  this.http.get<number>(`http://localhost:8080/api/pending-count/${this.userId}`)
  .subscribe(countPennd => {
    this.countPennding = countPennd;
  });
  this.http.get<LeaveBalanceType[]>(`http://localhost:8080/api/leave-balance-all-type/${this.userId}`)
  .subscribe(data => {
    this.leaveBalances = data;
  });
}
}
