import { Component } from '@angular/core';
import {GuestNoPhoneComponent} from "../../guest/guest-no-phone/guest-no-phone.component";
import {FinancerSyntheseComponent} from "../../financer/financer-synthese/financer-synthese.component";

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
	imports: [
		GuestNoPhoneComponent,
		FinancerSyntheseComponent
	],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.css'
})
export class DashboardViewComponent {

}
