import { Component, inject, Input, ChangeDetectionStrategy, ViewChild, Output, EventEmitter, signal } from '@angular/core';
import { CustomButton } from "../shared/button/button";
import { AuthService } from '../services/auth.service';
import { GoalService } from '../services/goal.service';
import { GoalModal } from '../goal-modal/goal-modal';
import { Goal } from '../models/goal.model';
import { CommonModule } from '@angular/common';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CustomButton, GoalModal, CommonModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  faPerson = faCircleUser;
private authService = inject(AuthService)
  @Output() closeDialog = new EventEmitter<void>();
  @ViewChild(GoalModal) modal!:GoalModal;
  openMenu = signal(false);
  isModalOpen = false;
  isEditing = false;
  modalTitle:string = 'Create Goal';
  currentGoal:Goal = {name:'',target_amount:null, deadline:'',user_id:""}
  deadline?: Date;
  targetAmount = 0;
  goals:Goal[] = []

  constructor(private router:Router) {

  }

    @Output() openModalEvent = new EventEmitter<void>();

  toggleModal(event: Event) {
    // 1. Stops the click from bubbling up (prevents navigation/page reload)
    event.stopPropagation(); 
    
    // 2. Your logic to set your boolean variable to true
    this.openModalEvent.emit();
  }
  handleSignOut():void{
    this.authService.signOut()

  }
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
  onOpenMenu(){
    this.openMenu.update((state)=>!state);
  }
}
