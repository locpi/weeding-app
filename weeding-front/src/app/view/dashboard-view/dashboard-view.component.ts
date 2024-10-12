import {Component} from '@angular/core';
import {GuestNoPhoneComponent} from "../../guest/guest-no-phone/guest-no-phone.component";

@Component({
	selector: 'app-dashboard-view',
	standalone: true,
	imports: [
		GuestNoPhoneComponent,
	],
	templateUrl: './dashboard-view.component.html',
	styleUrl: './dashboard-view.component.css'
})
export class DashboardViewComponent {

}
