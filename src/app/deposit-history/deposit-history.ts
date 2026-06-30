import { Component, inject, OnInit } from '@angular/core';
import { Deposit } from '../services/deposit';
import { map, Observable } from 'rxjs';
import { GoalService } from '../services/goal.service';
import { DataSharing } from '../data-sharing';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-deposit-history',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './deposit-history.html',
  styleUrl: './deposit-history.css',
})
export class DepositHistory implements OnInit {
  private depositService = inject(Deposit);
  private dataService = inject(DataSharing)
    deposits$!:Observable<any[]>;
    goalId='';
    sum$!:Observable<number>;
  
  ngOnInit(): void {
    this.goalId = this.dataService.goalDetails().id
    this.deposits$ = this.depositService.getGoalDeposits(this.goalId);
    this.sum$ = this.depositService.getGoalDeposits(this.goalId).pipe(
      map(items=>items.reduce((acc,curr)=>acc+1,0))
    )
    
  }
}
