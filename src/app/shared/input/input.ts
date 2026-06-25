import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
@Component({
  selector: "app-input",
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: "./input.html",
  styleUrl: "./input.css",
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true,
    },
  ],
})
export class CustomInput implements ControlValueAccessor {
  // Required input: parent must provide this
  @Input() type: string = "text";
  @Input() icon?: IconDefinition;
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @ViewChild("inputEl") inputElement!: ElementRef<HTMLInputElement>;
  value: string = "";
  disabled: boolean = false;
  // onChange: any = () => {};
  private onChange: (value: any) => void = () => {};
  onTouched: any = () => {};

  onIconClick() {
    if (this.type === "date" && this.inputElement) {
      const input = this.inputElement.nativeElement;
      if (typeof input.showPicker === "function") {
        input.showPicker(); // Opens the native calendar menu
      }
    }
  }
  onInputChange(event: any) {
    const inputEvent = event as InputEvent;
    const target = inputEvent.target as HTMLInputElement;
    this.value = target.value;

    // Notify the parent form of the new value
    this.onChange(this.value);
  }
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  // @Output() valueChange = new EventEmitter<string>();

  // onInputChange(event: Event) {
  //   const value = (event.target as HTMLInputElement).value;
  //   this.valueChange.emit(value);
  // }
}
