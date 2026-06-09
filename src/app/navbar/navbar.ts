import { Component, inject, Input } from '@angular/core';
import { CustomButton } from "../shared/button/button";
import { Modal } from '../shared/modal/modal';
import { AuthService } from '../services/auth.service';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-navbar',
  imports: [CustomButton,Modal],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);
  private goalService = inject(GoalService);
  @Input() openModal = false;
  userId: string = '';
  deadline?: Date;
  targetAmount = 0;
  
  constructor() {
    this.authService.getCurrentUser().then(response => {
      if (response) {
        this.userId = response.id;
      }
    });
  }
  
  handleOpenModal(){
    this.openModal = !this.openModal;
  }
  handleCreateNewGoal(goalName:string,targetAmount:number, deadline?:Date){
    this.goalService.createGoal({user_id:this.userId, name:"",deadline:this.deadline,target_amount:this.targetAmount})
  }
}
