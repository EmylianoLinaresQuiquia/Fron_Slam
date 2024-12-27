import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private esNavegador(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getItem(key: string): any {
    if (this.esNavegador()) {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch {
        return null;
      }
    }
    return null; // En SSR, siempre retornará null.
  }

  setItem(key: string, value: any): void {
    if (this.esNavegador()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key: string): void {
    if (this.esNavegador()) {
      localStorage.removeItem(key);
    }
  }

}
