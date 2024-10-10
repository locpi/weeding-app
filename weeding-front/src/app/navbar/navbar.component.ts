import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {AuthGoogleService} from "../guards/auth-google.service";

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
  authService = inject(AuthGoogleService);

  @Output() menuToggle = new EventEmitter<void>();

  toggleMenu() {
    this.menuToggle.emit();
  }


  logout() {
    this.authService.logout()
    window.location.href = "/"
  }
}
