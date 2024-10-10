import { Component } from '@angular/core';
import {GuestFormComponent} from "../../guest/guest-form/guest-form.component";
import {GuestListComponent} from "../../guest/guest-list/guest-list.component";
import {FamilyService} from "../../services/family.service";


@Component({
  selector: 'app-guest-view',
  standalone: true,
	imports: [
		GuestFormComponent,
		GuestListComponent
	],
  templateUrl: './guest-view.component.html',
  styleUrl: './guest-view.component.css'
})
export class GuestViewComponent {
	file: File | null = null;

	constructor(private http: FamilyService) {}

	onFileSelected(event: any) {
		this.file = event.target.files[0];
	}

	uploadFile() {
		if (this.file) {
						this.http.uploadFile(this.file).subscribe()
		}
	}
}
