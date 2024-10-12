import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
	selector: 'app-validate-payment',
	standalone: true,
	imports: [
		MatCard,
		MatCardTitle,
		MatCardHeader,
		MatCardContent,
		MatCardActions,
		MatButton
	],
	templateUrl: './validate-payment.component.html',
	styleUrl: './validate-payment.component.css'
})
export class ValidatePaymentComponent implements OnInit {

	constructor(private route: ActivatedRoute) {
	}

	ngOnInit() {
		const token = this.route.snapshot.paramMap.get('token');


	}

}
