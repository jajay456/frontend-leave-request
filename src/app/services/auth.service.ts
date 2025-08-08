import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  department: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  // ✅ role$ ที่ normalize เป็นตัวพิมพ์ใหญ่เสมอ
  public role$ = this.user$.pipe(
    map(u => (u?.role ?? '').trim().toUpperCase())
  );

  constructor() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token) this.token = token;
      if (userStr) this.userSubject.next(JSON.parse(userStr));
    }
  }

  login(token: string, user: User) {
    const normalized = { ...user, role: (user.role ?? '').trim().toUpperCase() };

    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(normalized));
    }
    this.userSubject.next(normalized);
  }

  logout() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.userSubject.next(null);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
