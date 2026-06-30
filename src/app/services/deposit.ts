import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable, Service } from "@angular/core";
import { BehaviorSubject, Observable, finalize } from "rxjs";
import { Goal } from "../models/goal.model";

@Injectable({
  providedIn: "root",
})
export class Deposit {
  private apiUrl = "https://flasksavingstracker.onrender.com/api/deposit";
  private token = "";
  private headers!: HttpHeaders;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    const accessToken = localStorage.getItem(
      "sb-pgamtmhyimytcousdhtm-auth-token",
    );
    if (accessToken) {
      this.token = JSON.parse(accessToken).access_token;
    }
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    });
  }

  addDeposit(deposit: any): Observable<any> {
    this.loadingSubject.next(true);
    return this.http
      .post<any>(this.apiUrl, deposit, { headers: this.headers })
      .pipe(
        finalize(() => {
          this.loadingSubject.next(false);
        }),
      );
  }
    getGoalDeposits(goalId:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/${goalId}`,{headers:this.headers});
  }
  getDeposits(): Observable<any[]> {
    return this.http.get<{ month: String; amount: number }[]>(
      "https://flasksavingstracker.onrender.com/api/deposit",
      { headers: this.headers },
    );
  }
}
