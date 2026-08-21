import { Component, inject, Input, OnInit } from '@angular/core';
import { CustomButton } from "../shared/button/button";
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import { Goal } from '../models/goal.model';
import { DataSharing } from '../data-sharing';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location, NgIf } from '@angular/common';
import { GoalCard } from "../goal-card/goal-card";
import { AddDeposit } from "../add-deposit/add-deposit";
import { DepositHistory } from "../deposit-history/deposit-history";
import { GoalModal } from '../goal-modal/goal-modal';
import { DeleteModal } from "../delete-modal/delete-modal";
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-edit-details',
  imports: [CustomButton, DatePipe, GoalCard, AddDeposit, DepositHistory, GoalModal, NgIf, DeleteModal],
  templateUrl: './edit-details.html',
  styleUrl: './edit-details.css',
})
export class EditDetails implements OnInit{
  isOpen = false;
  isDeleteOpen = false;
  faBackArrow = faAngleLeft;
  dataService = inject(DataSharing)
  private location = inject(Location)
  private route = inject(ActivatedRoute)
  private goalService = inject(GoalService)
  ngOnInit(): void {
    if (this.dataService.goalDetails()) {
      return;
    }
    const goalId = this.route.snapshot.paramMap.get('id');
    if (goalId) {
      this.goalService.getGoal(goalId).subscribe((goal) => {
        this.dataService.getGoalDetails(goal);
      });
    }
  }
  navigateBack():void{
    this.location.back();
  }
   closeGoalModal(){
  this.isOpen = false;
 }
 closeDeleteModal(){
  this.isDeleteOpen = false;
 }
   handleSave(goal: any) {
    console.log('Saved Goal:', goal);
  }
}
