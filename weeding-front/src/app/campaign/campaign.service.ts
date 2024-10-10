import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from './campaign.model';

@Injectable({
	providedIn: 'root',
})
export class CampaignService {
	private apiUrl = 'http://localhost:7485/api/campaigns';


	constructor(private http: HttpClient) {}

	createCampaign(campaign: Campaign): Observable<Campaign> {
		return this.http.post<Campaign>(this.apiUrl, campaign);
	}

	getAllCampaigns(): Observable<Campaign[]> {
		return this.http.get<Campaign[]>(this.apiUrl);
	}
}