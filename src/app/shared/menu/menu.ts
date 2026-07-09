import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./menu.html",
  styleUrl: "./menu.css",
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=>Menu),
    multi:true
  }]
})
export class Menu implements OnInit {
  @Input() headerTitle: string = "";
  // @Input() choices: { label: string; value: string | number; filterFn:(data:any)=>boolean }[] = [];
  @Input() choices: any[] = [];
  @Input() selectedValue: string | number | null = null;
  @Input() groupName: string = "radio-menu-group";
  @Output() selectionChange = new EventEmitter<string | number>();
  @Output() filterChanged = new EventEmitter<(data:any)=>boolean>();
  @Output() sortChanged = new EventEmitter<(a: any, b: any) => number>();
  selectedFilter:string = 'all';
  ngOnInit(): void {
    this.onFilterChange('all')
  }

  onFilterChange(value:string){
    // this.selectedFilter = value
    const selectedOption = this.choices.find(opt=>opt.value === value);
    if(selectedOption){
      this.filterChanged.emit(selectedOption.filterFn)
    }
  }
  onSelectionChange(value: string | number) {
    this.selectedValue = value;
    this.selectionChange.emit(value);
  }

}
