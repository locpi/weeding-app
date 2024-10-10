import { Component } from '@angular/core';
import {CampaignService} from "../campaign.service";
import {Campaign} from "../campaign.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-campaign',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-campaign.component.html',
  styleUrl: './new-campaign.component.css'
})
export class NewCampaignComponent {
  constructor(private campService:CampaignService) {
  }
  newCampaign: Campaign = { title: '', startDate: '', content: '' };
  createCampaign(): void {
    this.campService.createCampaign(this.newCampaign).subscribe((campaign) => {
      this.newCampaign = { title: '', startDate: '', content: '' }; // Reset form
    });
  }
}
