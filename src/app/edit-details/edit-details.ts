import { Component, inject, Input } from '@angular/core';
import { CustomButton } from "../shared/button/button";
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import { Goal } from '../models/goal.model';
import { DataSharing } from '../data-sharing';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { GoalCard } from "../goal-card/goal-card";
import { AddDeposit } from "../add-deposit/add-deposit";
import { DepositHistory } from "../deposit-history/deposit-history";

@Component({
  selector: 'app-edit-details',
  imports: [CustomButton, DatePipe, GoalCard, AddDeposit, DepositHistory],
  templateUrl: './edit-details.html',
  styleUrl: './edit-details.css',
})
export class EditDetails {
  faBackArrow = faAngleLeft;
  dataService = inject(DataSharing)
  private location = inject(Location)
  navigateBack():void{
    this.location.back();
  }
}
