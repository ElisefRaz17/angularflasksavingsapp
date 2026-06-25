import { Component, inject, Input, ChangeDetectionStrategy, ViewChild, Output, EventEmitter } from '@angular/core';
import { CustomButton } from "../shared/button/button";
import { Modal } from '../shared/modal/modal';
import { AuthService } from '../services/auth.service';
import { GoalService } from '../services/goal.service';
import { GoalModal } from '../goal-modal/goal-modal';
import { Goal } from '../models/goal.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CustomButton,GoalModal,CommonModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Output() closeDialog = new EventEmitter<void>();
  @ViewChild(GoalModal) modal!:GoalModal;
  isModalOpen = false;
  isEditing = false;
  modalTitle:string = 'Create Goal';
  currentGoal:Goal = {name:'',target_amount:null, deadline:'',user_id:""}
  deadline?: Date;
  targetAmount = 0;
  goals:Goal[] = []
  constructor() {

  }
  
  // openCreateModal(){
  //   this.modalTitle = 'Create Goal';
  //   this.isModalOpen = true;
  //   this.activeGoal ={name:'', target_amount:null, deadline:'',user_id:''}
  //   // this.modal.openModal()
  // }
  // openEditModal(goal:Goal){
  //   this.modalTitle = 'Edit Goal';
  //   this.isModalOpen = true;
  //   this.activeGoal ={...goal};
  // }

  //   handleSaveGoal(goalData: any):void {
  //   console.log('Goal saved or edited:', goalData);
  //   // Add logic here to send goalData to a service or state store
  // }
 closeGoalModal(){
  this.isModalOpen = false;
 }
 openCreateGoal() {
    this.isEditing = false;
    this.currentGoal = { name:'',target_amount:null, deadline:'',user_id:""}; // Reset
    this.isModalOpen = true;
  }

  openEditGoal() {
    this.isEditing = true;
    // Load pre-existing goal data here
    this.currentGoal = {name: 'Learn Angular', target_amount:2000,deadline:'09-03-2026',user_id:"" }; 
    this.isModalOpen = true;
  }

  handleSave(goal: any) {
    console.log('Saved Goal:', goal);
  }
}
