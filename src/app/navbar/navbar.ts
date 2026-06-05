import { Component, Input } from '@angular/core';
import { CustomButton } from "../shared/button/button";
import { Modal } from '../shared/modal/modal';

@Component({
  selector: 'app-navbar',
  imports: [CustomButton,Modal],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() openModal = false;

  handleOpenModal(){
    this.openModal = !this.openModal;
  }
}
