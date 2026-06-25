import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, input, ChangeDetectionStrategy, Output } from "@angular/core";
export type ButtonVariant = "primary" | "secondary" | "danger";
@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./button.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: "./button.css",
})
export class CustomButton {
  @Input() disabled: boolean = false;
  @Input() variant: ButtonVariant = "primary";
  @Input() btnClick = new EventEmitter<void>();
  @Output() onClick = new EventEmitter<void>();
  @Input() type: "button" | "submit" | "reset" = "button";

  // onClick() {
  //   if (!this.disabled) {
  //     this.btnClick.emit();
  //   }
  // }
  get buttonClasses() {
    return {
      [`btn-${this.variant}`]: true,
      "btn-disabled": this.disabled,
    };
  }
}
