import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CustomInput } from '../shared/input/input';
import { CustomButton } from '../shared/button/button';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { DataSharing } from '../data-sharing';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CustomInput,CustomButton,RouterLink,FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  private authService = inject(AuthService)
  email = "";
  message = '';
  constructor(private http:HttpClient, private dataService: DataSharing, private router:Router){}

  sendEmail(email:string){
    this.dataService.updateEmail(email);
    this.router.navigate(['/reset-email'])
  }
  sendResetLink() {
    this.sendEmail(this.email);
    this.authService.sendPasswordReset(this.email).then(response=>{
      this.message = 'Check your email for the link!'
    })
  }
}
