import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CustomInput } from "../input/input";
import { CustomButton } from "../button/button";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { faDollar, faCalendar } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CustomInput, CustomButton, CommonModule, FormsModule],
  templateUrl: "./modal.html",
  styleUrl: "./modal.css",
})
export class Modal {
  @Input() header: string = "Header";
  @Input() submitLabel: string = "Create";
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() actionFunction: (() => void) | null = null;
  goalName = "";
  targetAmount = 0.0;
  deadline = "";
  faDollarSign = faDollar;
  faCalendar = faCalendar;

  onClose() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  closeOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains("overlay")) {
      this.onClose();
    }
  }
}
