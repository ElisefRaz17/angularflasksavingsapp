import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // A reactive list to hold active toast notifications
  toasts = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) {
    const id = Date.now();
    
    // Add new toast to the signal array
    this.toasts.update((currentToasts) => [...currentToasts, { id, message, type }]);

    // Auto-remove toast after specified duration
    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number) {
    this.toasts.update((currentToasts) => currentToasts.filter(t => t.id !== id));
  }
}
