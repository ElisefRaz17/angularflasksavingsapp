import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MonthlyDeposits } from "../monthly-deposits/monthly-deposits";
import { Goals } from "../goals/goals";


@Component({
  selector: 'app-home',
  imports: [MonthlyDeposits, Goals],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // private authService = inject(AuthService);
  // user = this.authService.getCurrentUser();
 
}
