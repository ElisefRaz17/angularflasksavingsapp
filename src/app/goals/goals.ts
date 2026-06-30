import { Component, inject, OnInit } from "@angular/core";
import { CustomButton } from "../shared/button/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { GoalCard } from "../goal-card/goal-card";
import { Goal } from "../models/goal.model";
import { GoalService } from "../services/goal.service";
import { AsyncPipe } from "@angular/common";
import { Observable } from "rxjs";
import { DataSharing } from "../data-sharing";
import { Router } from "@angular/router";

@Component({
  selector: "app-goals",
  imports: [CustomButton, FontAwesomeModule, GoalCard, AsyncPipe],
  templateUrl: "./goals.html",
  styleUrl: "./goals.css",
})
export class Goals implements OnInit {
  faFilter = faFilter;
  private goalService = inject(GoalService);

  
  constructor(private dataService:DataSharing, private router:Router){}
  goals$!:Observable<any[]>;
  // goals:any[] = [];

  onCardClick(goal:any){
    this.dataService.getGoalDetails(goal);
    this.router.navigate(['/goal-details'])
  }
  ngOnInit(): void {
    this.goals$ = this.goalService.getGoals();
    // this.goalService.getGoals().subscribe(
    //   data => {this.goals = data
    //   console.log('GOals', this.goals)}
    // );
    
  }
}
