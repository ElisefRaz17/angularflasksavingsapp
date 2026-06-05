import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomButton } from '../shared/button/button';

@Component({
  selector: 'app-delete-modal',
  standalone:true,
  imports: [CommonModule, CustomButton],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css',
})
export class DeleteModal {
  @Input() goalName = "Goal Name";
    @Input() isOpen = true;
  @Output() close = new EventEmitter<void>();
  @Input() actionFunction: (() => void) | null = null;
   onClose() {
    this.isOpen = false;
    this.close.emit();
  }

  // Prevents clicking inside the modal content from closing it
  onContainerClick(event: MouseEvent) {
    event.stopPropagation();
  }

}
