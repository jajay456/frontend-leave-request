import { Routes } from '@angular/router';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { RequestLeaveComponentComponent } from './request-leave-component/request-leave-component.component';
import { LeaveHistoryComponentComponent } from './leave-history-component/leave-history-component.component';
import { ManagerLeaveComponent } from './manager-leave/manager-leave.component';
import { LeaveBalanceDisplayComponentComponent } from './leave-balance-display-component/leave-balance-display-component.component';
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponentComponent },
  { path: 'request-leave', component: RequestLeaveComponentComponent },
  { path: 'leave-history', component: LeaveHistoryComponentComponent },
  { path: 'leave-manager', component: ManagerLeaveComponent },
  { path: 'leave-balance', component: LeaveBalanceDisplayComponentComponent },

  
];
