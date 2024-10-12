import {Component, Inject} from '@angular/core';
import {MatCardActions} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {GroupPeople} from "../group-people.service";

@Component({
	selector: 'app-group-add',
	standalone: true,
	imports: [MatCardActions,
		MatLabel,
		MatFormField,
		MatDialogContent,
		MatDialogTitle,
		MatInput,
		FormsModule,
		MatDialogClose,
		MatButton,
		MatDialogActions],
	templateUrl: './group-add.component.html',
	styleUrl: './group-add.component.css'
})
export class GroupAddComponent {
	constructor(
		public dialogRef: MatDialogRef<GroupAddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: GroupPeople
	) {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
