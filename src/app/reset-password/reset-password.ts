import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomInput } from '../shared/input/input';
import { CustomButton } from '../shared/button/button';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { DataSharing } from '../data-sharing';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [CustomInput,CustomButton,RouterLink,FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  email = "";
  message = '';
  constructor(private http:HttpClient, private dataService: DataSharing, private router:Router){}

  sendEmail(email:string){
    this.dataService.updateEmail(email);
    this.router.navigate(['/reset-email'])
  }
  sendResetLink() {
    this.sendEmail(this.email);
    this.http.post('https://flasksavingstracker.onrender.com/api/reset-password', { email: this.email })
      .subscribe(() => this.message = 'Check your email for the link!');
  }
  // }
}
