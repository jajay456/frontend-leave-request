import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  department = '';

  constructor(private http: HttpClient) {}

  onRegister() {
    const requestBody = {
      username: this.username,
      email: this.email,
      password: this.password,
      department: this.department,
    };

    this.http.post('http://localhost:8080/api/auth/register', requestBody).subscribe({
      next: (res) => {
        console.log('✅ Register success:', res);
        alert('สมัครสมาชิกสำเร็จ');
      },
      error: (err) => {
        console.error('❌ Register failed:', err);
        alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      },
    });
  }
}
