import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { CustomButton } from "../shared/button/button";
import { DataSharing } from "../data-sharing";
import { GoalService } from "../services/goal.service";
import { Router } from "@angular/router";
import { ToastService } from "../services/toast";

@Component({
  selector: "app-delete-modal",
  standalone: true,
  imports: [CommonModule, CustomButton],
  templateUrl: "./delete-modal.html",
  styleUrl: "./delete-modal.css",
})
export class DeleteModal implements OnInit {
  private dataService = inject(DataSharing);
  private goalService = inject(GoalService);
  private toastService = inject(ToastService)
  private router = inject(Router)
  @Input() goalName = "Goal Name";
  @Input() isOpen = true;
  @Output() close = new EventEmitter<void>();
  @Input() actionFunction: (() => void) | null = null;
  goalId = "";
  onClose() {
    this.isOpen = false;
    this.close.emit();
  }
  ngOnInit(): void {
    this.goalId = this.dataService.goalDetails().id;
  }

  // Prevents clicking inside the modal content from closing it
  onContainerClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onSubmit() {
    this.goalService.deleteGoal(this.goalId).subscribe({
      next: (response) => {
        this.onClose();
        this.router.navigate([''])
        this.toastService.show(response.message,"success")
      },
      error: (error) => {
        console.error("API error", error);
        this.toastService.show(error,"error")
      },
    });
  }
}
