import { Component, inject, Input } from '@angular/core';
import { CustomButton } from "../shared/button/button";
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import { Goal } from '../models/goal.model';
import { DataSharing } from '../data-sharing';
import { Router } from '@angular/router';
import { DatePipe, Location, NgIf } from '@angular/common';
import { GoalCard } from "../goal-card/goal-card";
import { AddDeposit } from "../add-deposit/add-deposit";
import { DepositHistory } from "../deposit-history/deposit-history";
import { GoalModal } from '../goal-modal/goal-modal';
import { DeleteModal } from "../delete-modal/delete-modal";

@Component({
  selector: 'app-edit-details',
  imports: [CustomButton, DatePipe, GoalCard, AddDeposit, DepositHistory, GoalModal, NgIf, DeleteModal],
  templateUrl: './edit-details.html',
  styleUrl: './edit-details.css',
})
export class EditDetails{
  isOpen = false;
  isDeleteOpen = false;
  faBackArrow = faAngleLeft;
  dataService = inject(DataSharing)
  private location = inject(Location)
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
