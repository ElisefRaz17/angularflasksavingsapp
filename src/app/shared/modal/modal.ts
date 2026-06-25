import { Component, EventEmitter, Inject, inject, Input, OnInit, Output, ChangeDetectionStrategy, ElementRef, ViewChild } from "@angular/core";
import { CustomInput } from "../input/input";
import { CustomButton } from "../button/button";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
// import {DIALOG_DATA,DialogRef} from '@angular/cdk/dialog';
import { faDollar, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { GoalService } from "../../services/goal.service";
import { AuthService } from "../../services/auth.service";
import { Goal } from "../../models/goal.model";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CustomInput, CustomButton, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./modal.html",
  styleUrl: "./modal.css",
})
export class Modal {
  @ViewChild('goalDialog') dialog!: ElementRef<HTMLDialogElement>;
  private goalService = inject(GoalService);
  private authService = inject(AuthService);
  @Input() header: string = "Header";
  @Input() submitLabel: string = "Create";
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() goalData:Goal = {user_id:'',name:'',target_amount:0.0,deadline:undefined}
  @Output() save = new EventEmitter<Goal>();
  @Input() actionFunction: (() => void) | null = null;
  isEditMode:boolean;
  goalForm: FormGroup;
  private fb =  inject(FormBuilder)
  goalName = "";
  targetAmount = 0.0;
  deadline = "";
  userId:string = '';
  faDollarSign = faDollar;
  faCalendar = faCalendar;
  
  constructor(){
    this.isEditMode = false;
    this.goalForm = this.fb.group({
      name:['', Validators.required],
      targetAmount:[0, Validators.required],
      deadline:[null]
    });
    this.authService.getCurrentUser().then(response => {
      if (response) {
        this.userId = response.id;
      }
    });
    // console.log('GOal Data', this.goalData)
  }

  saveGoal(){
    this.save.emit(this.goalData);
    this.onClose();
  }

  // constructor(public dialogRef: DialogRef<any>, @Inject(DIALOG_DATA) public data:any){
  //   this.isEditMode = data.mode === "edit";
  //   this.goalForm = this.fb.group({
  //     name:[data.goal.name || '', Validators.required],
  //     targetAmount:[data.goal.target_amount || 0, Validators.required],


  //   })
  // }
   handleCreateNewGoal(goalName:string,targetAmount:number, deadline?:Date){
    this.goalService.createGoal({user_id:this.userId, name:"",deadline:this.deadline as any,target_amount:this.targetAmount})
  }

  onClose() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  closeOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains("overlay")) {
      this.onClose();
    }
  }
}
