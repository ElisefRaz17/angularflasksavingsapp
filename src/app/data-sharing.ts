import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSharing {
  private emailSignal = signal<string>('');
  readonly currentEmail = this.emailSignal.asReadonly();
  updateEmail(newEmail: string){
    this.emailSignal.set(newEmail);
  }
}
