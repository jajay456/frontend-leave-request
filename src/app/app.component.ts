// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  constructor(public auth: AuthService, private router: Router) {}
  isDark = false;
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme(event: Event) {
    this.isDark = (event.target as HTMLInputElement).checked;
    const theme = this.isDark ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', theme);
  }
}
