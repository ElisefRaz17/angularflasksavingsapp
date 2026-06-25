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

@Component({
  selector: "app-goal-modal",
  standalone:true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CustomInput,
    CustomButton,
  ],
  templateUrl: "./goal-modal.html",
  styleUrl: "./goal-modal.css",
})
// export class GoalModal implements OnInit {
//   @ViewChild("goalDialog") dialog!: ElementRef<HTMLDialogElement>;
//   @Input() isModalOpen = false;
//   @Input() header: string = "Header";
//   @Input() isEditMode = false;
//   @Input() goalData: Goal = {
//     name: "",
//     target_amount: null,
//     deadline: "",
//     user_id: "",
//   };
//   @Input() initialData: Goal | null = null;
//   @Output() save = new EventEmitter<Goal>();
//   @Output() closeDialog = new EventEmitter<void>();
//   faDollarSign = faDollar;
//   faCalendar = faCalendar;
//   goalForm!: FormGroup;
//   constructor(private fb: FormBuilder) {}
//   ngOnInit(): void {
//     this.initializeForm();
//   }
//   initializeForm(): void {
//     this.goalForm = this.fb.group({
//       name: [this.initialData?.name || "", Validators.required],
//       targetAmount: [
//         this.initialData?.target_amount || "",
//         [Validators.required, Validators.min(0)],
//       ],
//       deadline: [this.initialData?.deadline || ""],
//     });
//   }
//   openModal() {
//     this.dialog.nativeElement.showModal();
//   }
//   closeModal():void {
//    if(this.dialog){
//     this.dialog.nativeElement.close();
//     this.closeDialog.emit();
//    }
//   }
//   onSubmit() {
//     console.log('Goal FOrm', this.goalForm.value)
//     if (this.goalForm.valid) {
//       this.save.emit(this.goalForm.value);
//       this.closeModal();
//     }
//   }
// }
export class GoalModal implements OnInit{
  goalForm!: FormGroup;
  @Input() isVisible = false;
  @Input() isEdit = false;
  // goalForm!: FormGroup;
  // private fb = inject(FormBuilder);
  // goalForm = this.fb.group({
  //   name:[''],
  //   deadline:[''],
  //   target_amount:['']
  // })
 
  faDollarSign = faDollar;
  faCalendar = faCalendar;
  name = '';
  deadline=null;
  target_amount=0;


  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Goal>();


ngOnInit(): void {
    this.goalForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    deadline: new FormControl(null),
    target_amount: new FormControl('',[Validators.required])
  })
}
onClose() {
    this.close.emit();
    this.goalForm.reset();
  }
  onModalContentClick(event: MouseEvent) {
    event.stopPropagation();
  }

onSubmit() {
    // TODO: Use output() with form value
    if(this.goalForm.valid){
      console.log('Goal submitted', this.goalForm.value);
      this.onClose();
    }
  }
  
}
