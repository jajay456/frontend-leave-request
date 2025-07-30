import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { RequestLeaveComponentComponent } from './request-leave-component/request-leave-component.component';
import { LeaveHistoryComponentComponent } from './leave-history-component/leave-history-component.component';
import { ManagerLeaveComponent } from './manager-leave/manager-leave.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    DashboardComponentComponent,
    RequestLeaveComponentComponent,
    LeaveHistoryComponentComponent,
    ManagerLeaveComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'leave-management-frontend';
 isDark = false;

toggleTheme(event: Event) {
  this.isDark = (event.target as HTMLInputElement).checked;
  const theme = this.isDark ? 'dark' : 'light';
  document.body.setAttribute('data-bs-theme', theme);
}
}
