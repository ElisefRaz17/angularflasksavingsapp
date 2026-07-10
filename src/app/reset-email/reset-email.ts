import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { CustomInput } from "../shared/input/input";
import { CustomButton } from "../shared/button/button";
import { HttpClient } from "@angular/common/http";
import { DataSharing } from "../data-sharing";
import { Route, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-reset-email",
  imports: [CustomButton],
  templateUrl: "./reset-email.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./reset-email.css",
})
export class ResetEmail {
  private authService = inject(AuthService)
  constructor(
    private http: HttpClient,
    private dataService: DataSharing,
    private router: Router,
  ) {}
  email = this.dataService.currentEmail;
  message = "";
  openEmailApp() {
    window.open('https://mail.google.com/','_blank');
  }
  onBacktoSignIn(){
    this.router.navigate(['/login'])
  }
    sendEmail(email:string){
    this.dataService.updateEmail(email);
  }
  resendResetLink(){
        this.sendEmail(this.email());
    this.authService.sendPasswordReset(this.email()).then(response=>{
      this.message = 'Check your email for the link!'
    })
  }
}
