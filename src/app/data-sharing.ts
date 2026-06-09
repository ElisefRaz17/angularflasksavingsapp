import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSharing {
  private emailSignal = signal<string>('');
  private goalNameSignal = signal<string>('');
  private goalAmount = signal<number>(0);
  private goalDeadline = signal<Date | undefined>(undefined);
  readonly currentEmail = this.emailSignal.asReadonly();
  readonly currentGoalName = this.goalNameSignal.asReadonly();
  readonly currentGoalAmount = this.goalAmount.asReadonly();
  readonly currentGoalDeadline = this.goalDeadline.asReadonly();
  updateEmail(newEmail: string){
    this.emailSignal.set(newEmail);
  }
  updateGoalName(goalName:string){
    this.goalNameSignal.set(goalName);
  }
  updateGoalAmount(goalAmount:number){
    this.goalAmount.set(goalAmount);
  }
  updateDeadLine(goalDeadline:Date|undefined){
    this.goalDeadline.set(goalDeadline)
  }
}
