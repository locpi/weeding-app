import { Component } from '@angular/core';
import {NewCampaignComponent} from "../../campaign/new-campaign/new-campaign.component";
import {ListCampaignComponent} from "../../campaign/list-campaign/list-campaign.component";

@Component({
  selector: 'app-campaign-view',
  standalone: true,
	imports: [
		NewCampaignComponent,
		ListCampaignComponent
	],
  templateUrl: './campaign-view.component.html',
  styleUrl: './campaign-view.component.css'
})
export class CampaignViewComponent {

}
