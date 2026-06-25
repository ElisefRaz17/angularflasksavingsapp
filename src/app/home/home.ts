import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // private authService = inject(AuthService);
  // user = this.authService.getCurrentUser();
 
}
