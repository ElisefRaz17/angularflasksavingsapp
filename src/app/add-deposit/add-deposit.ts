import { Component, inject, OnInit } from '@angular/core';
import { CustomInput } from "../shared/input/input";
import { faDollar} from "@fortawesome/free-solid-svg-icons";
import { CustomButton } from "../shared/button/button";
import { Deposit } from '../services/deposit';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { DataSharing } from '../data-sharing';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-deposit',
  imports: [CustomInput,ReactiveFormsModule, FormsModule, CustomButton, ɵInternalFormsSharedModule,CommonModule],
  templateUrl: './add-deposit.html',
  styleUrl: './add-deposit.css',
})
export class AddDeposit implements OnInit{
  depositForm!:FormGroup;
  dataService = inject(DataSharing);
  authService = inject(AuthService)
  private toastService = inject(ToastService)
  private depositService = inject(Deposit)
    faDollarSign = faDollar;
    isLoading = false;
    user_id = '';
    constructor(private router:Router){}
    ngOnInit(): void {
      this.depositForm = new FormGroup({
        amount:new FormControl("",[Validators.required,Validators.min(1)]),
          note: new FormControl("")
        
      });
      this.authService.getCurrentUser().then((response)=>{
        if(response){
          this.user_id = response.id;
        }
      })
      console.log(this.dataService.goalDetails().id)
    }
    get amount(){
      return this.depositForm.get('amount')
    }

    onSubmit(){
      this.isLoading = true;
      this.depositService.addDeposit({...this.depositForm.value,goal_id:this.dataService.goalDetails().id, user_id:this.user_id})
      .pipe(finalize(()=>(this.isLoading = false)))
      .subscribe({
        next:(response)=>{
          this.toastService.show('Deposit Addeded Successfully','success');
          this.router.navigate([''])
        },
        error:(error) => {
          console.error('API error',error);
          this.toastService.show('Error Adding Deposit','error')
        }
      })
    }
}
