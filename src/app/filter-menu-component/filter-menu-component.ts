import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-menu-component',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-menu-component.html',
  styleUrl: './filter-menu-component.css',
})
export class FilterMenuComponent {
  @Input() headerTitle: string = "";
  @Input() groupId: string = '';
  @Input() options: any[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  selectedValue: string = '';

  onSelectionChange() {
    this.selectionChange.emit(this.selectedValue);
  }
}
