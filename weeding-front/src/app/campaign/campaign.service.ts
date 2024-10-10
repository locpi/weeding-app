import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from './campaign.model';
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: 'root',
})
export class CampaignService {
	private apiUrl = environment.apiURL+'/api/campaigns';


	constructor(private http: HttpClient) {}

	createCampaign(campaign: Campaign): Observable<Campaign> {
		return this.http.post<Campaign>(this.apiUrl, campaign);
	}

	getAllCampaigns(): Observable<Campaign[]> {
		return this.http.get<Campaign[]>(this.apiUrl);
	}
}