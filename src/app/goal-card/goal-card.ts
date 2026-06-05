import { CommonModule } from '@angular/common';
import { Component, computed, Input } from '@angular/core';

export type CardSize = "default" | "wide" | "tall";
export type CardState = "no-progress" | "in-progress" | "complete" ;

@Component({
  selector: 'app-goal-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './goal-card.html',
  styleUrl: './goal-card.css',
})
export class GoalCard {
  @Input({required:true}) title!:string;
  @Input() currentAmount!: number;
  @Input() goalAmount!: number;

  @Input() size: CardSize = 'default';
  @Input() state: CardState = 'no-progress';

   protected progressPercentage = computed(() => {
    if (this.goalAmount <= 0) return 0;
    const percentage = (this.currentAmount / this.goalAmount) * 100;
    return Math.min(Math.max(percentage, 0), 100); // Clamp between 0 and 100
  });

  // Size variant mapping
  protected sizeClasses = computed(() => {
    const classes: Record<CardSize, { card: string; title: string; amount: string; progressTrack: string }> = {
      default: { card: 'p-5 max-w-sm', title: 'text-xl text-neutral-0', amount: 'text-sm', progressTrack: 'h-2.5'},
      wide: { card: 'p-5 max-w-lg', title: 'text-base', amount: 'text-xl', progressTrack: 'h-2.5' },
      tall: { card: 'p-6 max-w-md', title: 'text-lg', amount: 'text-2xl', progressTrack: 'h-4' }
    };
    return classes[this.size];
  });

  // State variant mapping
  protected stateClasses = computed(() => {
    const classes: Record<CardState, { bar: string; text: string; bg: string }> = {
      'no-progress': { bar: 'bg-neutral-700', text: 'text-neutral-0', bg: 'bg-neutral-800' },
      'in-progress': { bar: 'bg-orange-400', text: 'text-orange-400', bg: 'bg-neutral-800' },
      'complete': { bar: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' }
    };
    return classes[this.state];
  });
}
