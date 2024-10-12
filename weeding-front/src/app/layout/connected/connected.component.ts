import {Component} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {SidenavComponent} from "./sidenav/sidenav.component";

@Component({
	selector: 'app-connected',
	standalone: true,
	imports: [
		MatSidenav,
		MatSidenavContainer,
		MatSidenavContent,
		NavbarComponent,
		RouterOutlet,
		SidenavComponent
	],
	templateUrl: './connected.component.html',
	styleUrl: './connected.component.css'
})
export class ConnectedComponent {
	sidenavOpened = true;

	toggleSidenav() {
		this.sidenavOpened = !this.sidenavOpened;
	}
}
