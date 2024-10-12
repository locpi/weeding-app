import {Component, Inject} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle
} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {OrganizerPeople} from "../organizer.service";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {GroupPeople, GroupPeopleService} from "../../group/group-people.service";

@Component({
	selector: 'app-organizer-new',
	standalone: true,
	imports: [
		MatLabel,
		MatFormField,
		MatDialogContent,
		MatDialogTitle,
		MatInput,
		FormsModule,
		MatDialogClose,
		MatButton,
		MatDialogActions,
		MatError,
		MatOption,
		MatSelect,
		NgForOf,
		NgIf,
		ReactiveFormsModule,
		AsyncPipe
	],
	templateUrl: './organizer-new.component.html',
	styleUrl: './organizer-new.component.css'
})
export class OrganizerNewComponent {

	$peopleGroup: Observable<GroupPeople[]>;

	constructor(
		public dialogRef: MatDialogRef<OrganizerNewComponent>,
		@Inject(MAT_DIALOG_DATA) public data: OrganizerPeople,
		private peopleGroupService: GroupPeopleService
	) {
		this.$peopleGroup = this.peopleGroupService.getAll();
	}


	onNoClick(): void {
		this.dialogRef.close();
	}

	setGroup($event: MatSelectChange) {
		console.log($event.value)
		this.data.groups = $event.value
	}
}
