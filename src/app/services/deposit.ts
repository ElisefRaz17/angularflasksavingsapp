import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable, Service } from "@angular/core";
import { BehaviorSubject, Observable, finalize, from, switchMap } from "rxjs";
import { Goal } from "../models/goal.model";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class Deposit {
  private apiUrl = "https://flasksavingstracker.onrender.com/api/deposit";
  private token = "";
  private headers!: HttpHeaders;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loading$ = this.loadingSubject.asObservable();
  private supabase: SupabaseClient;
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
      this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }
    async getAuthHeaders() {
      const { data } = await this.supabase.auth.getSession();
      const token = data.session?.access_token;
  
      return new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
    }

  addDeposit(deposit: any): Observable<any> {
    this.loadingSubject.next(true);
    return from(this.getAuthHeaders()).pipe(switchMap(headers=>this.http
      .post<any>(this.apiUrl, deposit, { headers })
      .pipe(
        finalize(() => {
          this.loadingSubject.next(false);
        }),
      )));
  }
  getGoalDeposits(goalId: string): Observable<any[]> {
    return from(this.getAuthHeaders()).pipe(switchMap(headers=>this.http.get<any[]>(`${this.apiUrl}/${goalId}`, {
      headers
    })));
  }
  getDeposits(): Observable<any[]> {
    return from(this.getAuthHeaders()).pipe(switchMap(headers=>this.http.get<{ month: String; amount: number }[]>(
      this.apiUrl,
      { headers },
    )));
  }
}
