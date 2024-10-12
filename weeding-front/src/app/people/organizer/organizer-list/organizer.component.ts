import {Component} from '@angular/core';
import {
	MatCard,
	MatCardActions,
	MatCardContent,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {OrganizerPeople, OrganizerPeopleService} from "../organizer.service";
import {OrganizerNewComponent} from "../organizer-new/organizer-new.component";
import {MatDialog} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {MatChip} from "@angular/material/chips";

@Component({
	selector: 'app-organizer',
	standalone: true,
	imports: [
		MatCardActions,
		MatCardContent,
		MatCardHeader,
		MatCard,
		MatButton,
		MatCardTitle,
		MatCardSubtitle,
		NgForOf,
		MatChip
	],
	templateUrl: './organizer.component.html',
	styleUrl: './organizer.component.css'
})
export class OrganizerComponent {
	organizerPeople: OrganizerPeople[] = [];

	constructor(
		private organizerPeopleService: OrganizerPeopleService,
		private dialog: MatDialog
	) {
	}

	ngOnInit() {
		this.loadOrganizerPeople();
	}

	loadOrganizerPeople() {
		this.organizerPeopleService.getAll().subscribe(
			(data) => {
				this.organizerPeople = data;
			},
			(error) => console.error('Error fetching organizer people', error)
		);
	}

	openDialog(person?: OrganizerPeople) {
		const dialogRef = this.dialog.open(OrganizerNewComponent, {
			width: '250px',
			data: person || {},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				if (result.id) {
					this.organizerPeopleService.update(result).subscribe(() => this.loadOrganizerPeople());
				} else {
					this.organizerPeopleService.create(result).subscribe(() => this.loadOrganizerPeople());
				}
			}
		});
	}

	deletePerson(person: OrganizerPeople) {
		if (confirm('Are you sure you want to delete this person?')) {
			this.organizerPeopleService.delete(person.id).subscribe(() => this.loadOrganizerPeople());
		}
	}
}
