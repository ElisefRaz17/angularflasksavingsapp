import { Component } from "@angular/core";
import { CustomInput } from "../shared/input/input";
import { CustomButton } from "../shared/button/button";
import { HttpClient } from "@angular/common/http";
import { DataSharing } from "../data-sharing";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-reset-email",
  imports: [CustomButton],
  templateUrl: "./reset-email.html",
  styleUrl: "./reset-email.css",
})
export class ResetEmail {
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
  resendResetLink() {
    this.http
      .post("https://flasksavingstracker.onrender.com/api/reset-password", {
        email: this.email,
      })
      .subscribe(() => (this.message = "Check your email for the link!"));
  }
}
