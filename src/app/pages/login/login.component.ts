import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) { }

  onLogin() {
    const payload = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:8080/api/auth/login', payload).subscribe({
      next: (res: any) => {
        console.log('✅ Login success:', res);
        alert('เข้าสู่ระบบสำเร็จ');

        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.user.id.toString());

        this.auth.login(res.token, res.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      },
    });
  }
}
