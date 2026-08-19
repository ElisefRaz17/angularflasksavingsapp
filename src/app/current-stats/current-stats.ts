import { Component, inject, OnInit } from '@angular/core';
import { Deposit } from '../services/deposit';
import { finalize, map, Observable, shareReplay } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GoalService } from '../services/goal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-current-stats',
  imports: [AsyncPipe],
  templateUrl: './current-stats.html',
  styleUrl: './current-stats.css',
})
export class CurrentStats implements OnInit {
isLoading = false;
totalSavings = 0;
user_id = ''
private depositService = inject(Deposit);
private goalService = inject(GoalService);
private authService = inject(AuthService)
sum$!:Observable<number>;
goalSum$!:Observable<number>;
goalsCompleted$!:Observable<number>;
ngOnInit(): void {
  this.isLoading = true;
      this.authService.getCurrentUser().then((response) => {
      if (response) {
        this.user_id = response.id;
      }
    });
 this.sum$ = this.depositService.getDeposits().pipe(
    map(data=>data.reduce((acc,curr)=>acc + curr.amount,0)),
    finalize(()=>(this.isLoading= false))
  );
  const goals$ = this.goalService.getGoals().pipe(
    finalize(()=>(this.isLoading= false)),
    shareReplay(1)
  );
  this.goalSum$ = goals$.pipe(
    map(data=>data.reduce((acc,curr)=>acc + 1,0))
  )
  this.goalsCompleted$ = goals$.pipe(
    map(data=>data.filter(item=>item.target_amount === item.current_amount).reduce((sum,cur)=>sum+1,0))
  )
  
}

}
