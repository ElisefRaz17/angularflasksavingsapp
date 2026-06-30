import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  FormControl,
} from "@angular/forms";
import { CustomInput } from "../shared/input/input";
import { faDollar, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Goal } from "../models/goal.model";
import { CustomButton } from "../shared/button/button";
import { AuthService } from "../services/auth.service";
import { GoalService } from "../services/goal.service";
import { HttpHeaders } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: "app-goal-modal",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CustomInput, CustomButton, CommonModule],
  templateUrl: "./goal-modal.html",
  styleUrl: "./goal-modal.css",
})
export class GoalModal implements OnInit {
  goalForm!: FormGroup;
  @Input() isVisible = false;
  @Input() isEdit = false;
  private authService = inject(AuthService);
  private goalService = inject(GoalService);
  faDollarSign = faDollar;
  faCalendar = faCalendar;
  name = "";
  deadline = null;
  target_amount = 0;
  user_id = "";
  token = "";
  isLoading = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Goal>();

  ngOnInit(): void {
    this.goalForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      deadline: new FormControl(null),
      target_amount: new FormControl("", [Validators.required]),
    });
    this.authService.getCurrentUser().then((response) => {
      if (response) {
        this.user_id = response.id;
      }
    });
  }
  onClose() {
    this.close.emit();
    this.goalForm.reset();
  }
  onModalContentClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.goalForm.valid) {
      this.goalService
        .createGoal({ ...this.goalForm.value, user_id: this.user_id })
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            console.log("Success", response);
            this.onClose();
          },
          error: (error) => {
            console.error("API error", error);
          },
        });
    }
  }
}
