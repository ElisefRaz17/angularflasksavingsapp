import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, finalize, from, Observable, switchMap } from "rxjs";
import { Goal } from "../models/goal.model";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class GoalService {
  private apiUrl = "https://flasksavingstracker.onrender.com/api/goals";
  private token = "";
  private refresh_token = "";
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
  getGoals(){
    return from(this.getAuthHeaders()).pipe(switchMap(headers=>this.http.get<any[]>(this.apiUrl, { headers })));
  }
  updateGoal(goalId: any, goal: any): Observable<any> {
    this.loadingSubject.next(true);
    return this.http
      .put(`${this.apiUrl}/${goalId}`, goal, { headers: this.headers })
      .pipe(
        finalize(() => {
          this.loadingSubject.next(false);
        }),
      );
  }
  createGoal(goal: Goal): Observable<Goal> {
    this.loadingSubject.next(true);
    return from(this.getAuthHeaders()).pipe(switchMap(headers=>this.http
      .post<Goal>(this.apiUrl, goal, { headers })
      .pipe(
        finalize(() => {
          this.loadingSubject.next(false);
        }),
      )));
  }
  deleteGoal(goalId: any): Observable<any> {
    this.loadingSubject.next(true);
    return this.http
      .delete<any>(`${this.apiUrl}/${goalId}`, { headers: this.headers })
      .pipe(
        finalize(() => {
          this.loadingSubject.next(false);
        }),
      );
  }
}
