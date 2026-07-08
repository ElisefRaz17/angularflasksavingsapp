import { Component, inject, OnInit } from '@angular/core';
import { Deposit } from '../services/deposit';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-current-stats',
  imports: [AsyncPipe],
  templateUrl: './current-stats.html',
  styleUrl: './current-stats.css',
})
export class CurrentStats implements OnInit {
totalSavings = 0;
private depositService = inject(Deposit);
private goalService = inject(GoalService)
sum$!:Observable<number>;
goalSum$!:Observable<number>;
goalsCompleted$!:Observable<number>;
ngOnInit(): void {
 this.sum$ = this.depositService.getDeposits().pipe(
    map(data=>data.reduce((acc,curr)=>acc + curr.amount,0))
  );
  this.goalSum$=this.goalService.getGoals().pipe(
    map(data=>data.reduce((acc,curr)=>acc + 1,0))
  )
  this.goalsCompleted$=this.goalService.getGoals().pipe(
    map(data=>data.filter(item=>item.target_amount === item.current_amount).reduce((sum,cur)=>sum+1,0))
  )
  
}

}
