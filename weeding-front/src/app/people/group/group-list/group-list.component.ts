import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
	MatCard,
	MatCardActions,
	MatCardContent,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {OrganizerNewComponent} from "../../organizer/organizer-new/organizer-new.component";
import {GroupPeople, GroupPeopleService} from "../group-people.service";

@Component({
	selector: 'app-group-list',
	standalone: true,
	imports: [
		MatButton,
		MatCard,
		MatCardActions,
		MatCardContent,
		MatCardHeader,
		MatCardSubtitle,
		MatCardTitle,
		NgForOf
	],
	templateUrl: './group-list.component.html',
	styleUrl: './group-list.component.css'
})
export class GroupListComponent {
	organizerPeople: GroupPeople[] = [];

	constructor(
		private groupPeopleService: GroupPeopleService,
		private dialog: MatDialog
	) {
	}

	ngOnInit() {
		this.loadOrganizerPeople();
	}

	loadOrganizerPeople() {
		this.groupPeopleService.getAll().subscribe(
			(data) => {
				this.organizerPeople = data;
			},
			(error) => console.error('Error fetching organizer people', error)
		);
	}

	openDialog(person?: GroupPeople) {
		const dialogRef = this.dialog.open(OrganizerNewComponent, {
			width: '250px',
			data: person || {},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				if (result.id) {
					this.groupPeopleService.update(result).subscribe(() => this.loadOrganizerPeople());
				} else {
					this.groupPeopleService.create(result).subscribe(() => this.loadOrganizerPeople());
				}
			}
		});
	}

	deletePerson(person: GroupPeople) {
		if (confirm('Are you sure you want to delete this person?')) {
			this.groupPeopleService.delete(person.id).subscribe(() => this.loadOrganizerPeople());
		}
	}
}
