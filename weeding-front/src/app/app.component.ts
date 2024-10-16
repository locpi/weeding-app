import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./layout/connected/navbar/navbar.component";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {SidenavComponent} from "./layout/connected/sidenav/sidenav.component";
import {GuestListComponent} from "./guest/guest-list/guest-list.component";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent, MatSidenav, SidenavComponent, MatSidenavContainer, GuestListComponent, MatSidenavContent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'weeding-front';
}
