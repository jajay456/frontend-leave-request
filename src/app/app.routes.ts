import { Routes } from '@angular/router';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { RequestLeaveComponentComponent } from './request-leave-component/request-leave-component.component';
import { LeaveHistoryComponentComponent } from './leave-history-component/leave-history-component.component';
import { ManagerLeaveComponent } from './manager-leave/manager-leave.component';
import { LeaveBalanceDisplayComponentComponent } from './leave-balance-display-component/leave-balance-display-component.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'LoginComponent', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponentComponent },
  { path: 'request-leave', component: RequestLeaveComponentComponent },
  { path: 'leave-history', component: LeaveHistoryComponentComponent },
  { path: 'leave-manager', component: ManagerLeaveComponent },
  { path: 'leave-balance', component: LeaveBalanceDisplayComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
];
