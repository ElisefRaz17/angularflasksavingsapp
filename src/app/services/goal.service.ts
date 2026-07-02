import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private apiUrl = 'https://flasksavingstracker.onrender.com/api/goals';
  private token = '';
  private headers!: HttpHeaders;
  private loadingSubject = new BehaviorSubject<boolean>(false)
  private loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    const accessToken = localStorage.getItem('sb-pgamtmhyimytcousdhtm-auth-token');
    if (accessToken) {
      this.token = JSON.parse(accessToken).access_token;
    }
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }
  getGoals():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl,{headers:this.headers});
  }
  updateGoal(goalId:any,goal:any):Observable<any>{
    this.loadingSubject.next(true);
    return this.http.put(`${this.apiUrl}/${goalId}`,goal,{headers:this.headers}).pipe(
     finalize(()=>{
      this.loadingSubject.next(false)

     })
    )
  }
  createGoal(goal: Goal): Observable<Goal> {
    this.loadingSubject.next(true);
    return this.http.post<Goal>(this.apiUrl, goal,{headers:this.headers}).pipe(
      finalize(()=>{
        this.loadingSubject.next(false)
      })
    );
  }
}
