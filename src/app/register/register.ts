import { Component, inject, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { CustomInput } from "../shared/input/input";
import { CustomButton } from "../shared/button/button";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";


@Component({
  selector: "app-register",
  standalone: true,
  imports: [CustomInput, CustomButton,RouterLink, FormsModule],
  templateUrl: "./register.html",
  styleUrl: "./register.css",
})
export class Register implements OnInit {
  private userService = inject(UserService);
  isMobile$ = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(map((result) => result.matches));
  constructor(private breakpointObserver: BreakpointObserver) {}
  email = "";
  full_name = "";
  password = "";
  users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  addUser(): void {
    this.userService.createUser({email:this.email,password:this.password,full_name:this.full_name}).subscribe(() => this.loadUsers());
  }
}
