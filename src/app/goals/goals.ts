import { Component, ElementRef, HostListener, inject, OnInit, signal } from "@angular/core";
import { CustomButton } from "../shared/button/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { GoalCard } from "../goal-card/goal-card";
import { GoalService } from "../services/goal.service";
import { AsyncPipe, CommonModule, NgIf } from "@angular/common";
import { Observable } from "rxjs";
import { DataSharing } from "../data-sharing";
import { Router } from "@angular/router";
import { Menu } from "../shared/menu/menu";
import { GoalFilterPipe } from "../goal-filter-pipe";
import { FilterMenuComponent } from "../filter-menu-component/filter-menu-component";
import {FilterSortPipe } from "../filter-sort-pipe";

@Component({
  selector: "app-goals",
  imports: [
    CustomButton,
    FontAwesomeModule,
    GoalFilterPipe,
    GoalCard,
    AsyncPipe,
    Menu,
    NgIf,
    CommonModule,
    FilterMenuComponent,
    FilterSortPipe
],
  templateUrl: "./goals.html",
  styleUrl: "./goals.css",
})
export class Goals implements OnInit {
  faFilter = faFilter;
  openFilterMenu = signal(false);
  openSortMenu = signal(false);
  selectedSort:string = 'recently_added'
  private goalService = inject(GoalService);
  cardSizes = ["default", "wide", "tall"];
  cardState: any = "";
  filteredGoals: any[] = [];
  allGoals: any[] = [];
  filterChoices = [
    {
      label: "All goals",
      value: "all",
      filterFn: () => true,
    },
    {
      label: "In progress",
      value: "in progress",
      filterFn: (g: any) => (g.current_amount / g.target_amount) * 100 < 50,
    },
    {
      label: "Completed",
      value: "completed",
      filterFn: (g: any) => (g.current_amount / g.target_amount) * 100 >= 90,
    },
  ];
    sortOptions: any[] = [
    { label: 'Recently Added', value: 'recently_added' },
    { label: 'Deadline Soonest First', value: 'deadline_soonest' },
    { label: 'Progress Highest First', value: 'progress_highest' },
    { label: 'Progress Lowest First', value: 'progress_lowest' },
    { label: 'Amount Saved Highest First', value: 'amount_highest' },
    { label: 'Alphabetical', value: 'alphabetical' }
  ];

  constructor(
    private dataService: DataSharing,
    private router: Router,
    private elementRef: ElementRef
  ) {}
  goals$!: Observable<any[]>;
  activeFilterFn: (data: any) => boolean = (data) => true;

 
  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.openFilterMenu()) {
      this.openFilterMenu.set(false);
    }
    if(!clickedInside && this.openSortMenu()){
      this.openSortMenu.set(false)
    }
  }

  onSortChange(sortFn: (a: any, b: any) => number) {
    // Sort mutates the array in-place or returns a copied array
    this.goalService.getGoals().subscribe(data => {
      this.goals$ = data.sort(sortFn) as any;
    });
  }
  onOpenFilter() {
    this.openFilterMenu.update((state) => !state);
  }
  onOpenSortBy() {
    this.openSortMenu.update((state) => !state);
  }
  applyFilter(filterFn: (data: any) => boolean) {
    this.activeFilterFn = filterFn;
    // this.filteredGoals = this.allGoals.filter(this.activeFilterFn);
  }
  onCardClick(goal: any) {
    this.dataService.getGoalDetails(goal);
    this.router.navigate(["/goal-details"]);
  }
  calculatePercentage(current: number, target: number): number {
    return Math.round((current / target) * 100);
  }
  ngOnInit(): void {
    this.goals$ = this.goalService.getGoals();
    this.setRandomState();
  }
  setRandomState() {
    const randomIndex = Math.floor(Math.random() * this.cardSizes.length);
    this.cardState = this.cardSizes[randomIndex];
  }

}
