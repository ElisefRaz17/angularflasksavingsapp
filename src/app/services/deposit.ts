import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, finalize } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class Deposit {
  private apiUrl = "https://flasksavingstracker.onrender.com/api/deposit";
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loading$ = this.loadingSubject.asObservable();
  constructor(private http: HttpClient) {}

  addDeposit(deposit: any): Observable<any> {
    this.loadingSubject.next(true);
    return this.http
      .post<any>(this.apiUrl, deposit)
      .pipe(
        finalize(() => {
          this.loadingSubject.next(false);
        }),
      );
  }
  getGoalDeposits(goalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${goalId}`);
  }
  getDeposits(): Observable<any[]> {
    return this.http.get<{ month: String; amount: number }[]>(this.apiUrl);
  }
}
