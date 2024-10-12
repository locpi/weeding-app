import {Component} from '@angular/core';
import {CostListComponent} from "../../cost/cost-list/cost-list.component";

@Component({
	selector: 'app-cost',
	standalone: true,
	imports: [
		CostListComponent
	],
	templateUrl: './cost.component.html',
	styleUrl: './cost.component.css'
})
export class CostComponent {

}
