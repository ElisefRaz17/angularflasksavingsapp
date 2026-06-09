import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private apiUrl = 'https://flasksavingstracker.onrender.com/api/goals';

  constructor(private http:HttpClient){}

  createGoal(goal:Goal):Observable<Goal>{
    return this.http.post<Goal>(this.apiUrl,goal)
  }
}
