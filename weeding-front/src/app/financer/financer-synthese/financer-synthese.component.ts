import {Component, OnInit} from '@angular/core';
import {FinancerService} from "../financer.service";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {GroupPeople} from "../../people/group/group-people.service";


export interface FinanceItem {
	people: GroupPeople;
	priceFood: number;
}


@Component({
	selector: 'app-financer-synthese',
	standalone: true,
	imports: [
		NgForOf,
		DecimalPipe,
		NgIf
	],
	templateUrl: './financer-synthese.component.html',
	styleUrl: './financer-synthese.component.css'
})
export class FinancerSyntheseComponent implements OnInit {
	financeData!: FinanceItem[];

	constructor(private service: FinancerService) {


	}

	ngOnInit(): void {
		this.service.getSynthse().subscribe(
			data => this.financeData = data,
			error => console.error('Erreur lors du chargement des données:', error)
		);
	}

}
