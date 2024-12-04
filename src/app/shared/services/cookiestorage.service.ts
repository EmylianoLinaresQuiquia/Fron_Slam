import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CookiestorageService {

  constructor(private cookieService: CookieService) {}

  saveUser(user: any): void {
    this.cookieService.set('user', JSON.stringify(user), { expires: 7, path: '/' });
  }

  getUser(): any {
    const user = this.cookieService.get('user');
    return user ? JSON.parse(user) : null;
  }

  clearUser(): void {
    this.cookieService.delete('user', '/');
  }
}
