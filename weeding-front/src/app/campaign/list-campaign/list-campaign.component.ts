import { Component } from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {Observable} from "rxjs";
import {Campaign} from "../campaign.model";
import {CampaignService} from "../campaign.service";

@Component({
  selector: 'app-list-campaign',
  standalone: true,
	imports: [
		NgForOf,
		AsyncPipe,
		DatePipe
	],
  templateUrl: './list-campaign.component.html',
  styleUrl: './list-campaign.component.css'
})
export class ListCampaignComponent {
	campaigns: Observable<Campaign[]>;

	constructor(private campService:CampaignService) {
		this.campaigns=this.campService.getAllCampaigns();
	}
}
