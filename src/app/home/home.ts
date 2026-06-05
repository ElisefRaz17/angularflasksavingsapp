import { Component } from '@angular/core';
import { Card } from '../shared/card/card';
import { GoalCard } from '../goal-card/goal-card';
import { Modal } from '../shared/modal/modal';

@Component({
  selector: 'app-home',
  imports: [GoalCard, Modal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  headerTitle="HEader Title"
    themeOptions: any[] = [
    { label: 'Light Mode', value: 'light' },
    { label: 'Dark Mode', value: 'dark' },
    { label: 'System Default', value: 'system', disabled: true }
  ];

  selectedTheme = 'light';

  handleThemeChange(value: string | number) {
    console.log('New theme selected:', value);
    // Update theme logic here
  }
}
