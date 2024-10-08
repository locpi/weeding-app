import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    MatIconButton
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  toggleMenu() {
    this.menuToggle.emit();
  }
}
