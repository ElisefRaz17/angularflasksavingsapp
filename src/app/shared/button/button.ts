import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, input, ChangeDetectionStrategy, Output } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger";
@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: "./button.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: "./button.css",
})
export class CustomButton {
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon?: IconDefinition;
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
  get isDisabled() {
    return this.disabled || this.loading;
  }
}
