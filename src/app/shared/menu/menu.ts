import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./menu.html",
  styleUrl: "./menu.css",
})
export class Menu {
  @Input() headerTitle: string = "";
  @Input() choices: { label: string; value: string | number }[] = [];
  @Input() selectedValue: string | number | null = null;
  @Input() groupName: string = "radio-menu-group";
  @Output() selectionChange = new EventEmitter<string | number>();

  onSelectionChange(value: string | number) {
    this.selectedValue = value;
    this.selectionChange.emit(value);
  }
}
