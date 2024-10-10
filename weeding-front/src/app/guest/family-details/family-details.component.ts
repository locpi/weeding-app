import {Component, signal} from '@angular/core';
import {
	MatCard,
	MatCardActions,
	MatCardContent,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {FamilyService} from "../../services/family.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {Family, Guest} from "../guest-list/guest.model";

@Component({
  selector: 'app-family-details',
  standalone: true,
	imports: [
		MatCard,
		MatCardHeader,
		MatCardContent,
		MatCardActions,
		NgIf,
		NgForOf,
		MatButton,
		AsyncPipe,
		MatCardTitle,
		MatCardSubtitle
	],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.css'
})
export class FamilyDetailsComponent {

	$members =signal<Guest[]>([]);

	constructor(private family:FamilyService, private route: ActivatedRoute) {
		const familyId = +this.route.snapshot.paramMap.get('id')!;
	this.family.getFamilyById(familyId).subscribe(data=>this.$members.set(data.members));

	}



}
