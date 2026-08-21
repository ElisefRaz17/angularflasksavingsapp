import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, finalize, Observable, Subject, tap } from "rxjs";
import { Goal } from "../models/goal.model";

@Injectable({
  providedIn: "root",
})
export class GoalService {
  private apiUrl = "https://flasksavingstracker.onrender.com/api/goals";
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loading$ = this.loadingSubject.asObservable();
  private goalsChangedSubject = new Subject<void>();
  readonly goalsChanged$ = this.goalsChangedSubject.asObservable();
  constructor(private http: HttpClient) {}
  getGoals(){
    return this.http.get<any[]>(this.apiUrl);
  }
  getGoal(goalId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${goalId}`);
  }
  updateGoal(goalId: any, goal: any): Observable<any> {
    this.loadingSubject.next(true);
    return this.http
      .put(`${this.apiUrl}/${goalId}`, goal)
      .pipe(
        tap(() => this.goalsChangedSubject.next()),
        finalize(() => {
          this.loadingSubject.next(false);
        }),
      );
  }
  createGoal(goal: Goal): Observable<Goal> {
    this.loadingSubject.next(true);
    return this.http
      .post<Goal>(this.apiUrl, goal)
      .pipe(
        tap(() => this.goalsChangedSubject.next()),
        finalize(() => {
          this.loadingSubject.next(false);
        }),
      );
  }
  deleteGoal(goalId: any): Observable<any> {
    this.loadingSubject.next(true);
    return this.http
      .delete<any>(`${this.apiUrl}/${goalId}`)
      .pipe(
        tap(() => this.goalsChangedSubject.next()),
        finalize(() => {
          this.loadingSubject.next(false);
        }),
      );
  }
}
