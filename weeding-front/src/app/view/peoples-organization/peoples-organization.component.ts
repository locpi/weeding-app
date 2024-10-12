import {Component} from '@angular/core';
import {OrganizerNewComponent} from "../../people/organizer/organizer-new/organizer-new.component";
import {OrganizerComponent} from "../../people/organizer/organizer-list/organizer.component";
import {GroupListComponent} from "../../people/group/group-list/group-list.component";

@Component({
	selector: 'app-peoples-organization',
	standalone: true,
	imports: [
		OrganizerNewComponent,
		OrganizerComponent,
		GroupListComponent
	],
	templateUrl: './peoples-organization.component.html',
	styleUrl: './peoples-organization.component.css'
})
export class PeoplesOrganizationComponent {

}
