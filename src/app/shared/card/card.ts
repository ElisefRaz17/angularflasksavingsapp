import { CommonModule } from "@angular/common";
import { Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./card.html",
  styleUrl: "./card.css",
})
export class Card {
  @Input() title: string = "Card Title";
  @Input() description: string = "Card description goes here.";
  @Input() progress: number = 0; // Value between 0 and 100
  @Input() goalName:string = "Goal Name";
  @Input() currentAmount:string = "";
  @Input() goalAmount:string = "";
  @Input() tag:string ="";
  @Input() size: "default" | "wide" | "tall" = "default";
  @Input() variant: "no-progress" | "in-progress" | "complete" = "no-progress";

  @HostBinding("class") get cardVariant() {
    return `card-variant-${this.variant}`;
  }
}
