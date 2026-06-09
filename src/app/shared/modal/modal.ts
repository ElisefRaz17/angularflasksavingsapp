import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from "@angular/core";
import { CustomInput } from "../input/input";
import { CustomButton } from "../button/button";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {DIALOG_DATA,DialogRef} from '@angular/cdk/dialog';
import { faDollar, faCalendar } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CustomInput, CustomButton, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./modal.html",
  styleUrl: "./modal.css",
})
export class Modal {
  @Input() header: string = "Header";
  @Input() submitLabel: string = "Create";
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() actionFunction: (() => void) | null = null;
  isEditMode:boolean;
  goalForm: FormGroup;
  private fb =  inject(FormBuilder)
  goalName = "";
  targetAmount = 0.0;
  deadline = "";
  faDollarSign = faDollar;
  faCalendar = faCalendar;
  

  constructor(public dialogRef: DialogRef<any>, @Inject(DIALOG_DATA) public data:any){
    this.isEditMode = data.mode === "edit";
    this.goalForm = this.fb.group({
      name:[data.goal.name || '', Validators.required],
      targetAmount:[data.goal.target_amount || 0, Validators.required],


    })
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
