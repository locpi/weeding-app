import {environment} from "../../../environments/environment";
// organizer-people.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupPeople} from "../group/group-people.service";

export interface OrganizerPeople {
	id: number;
	label: string;
	uuid: string;
	groups: GroupPeople[]
}

@Injectable({
	providedIn: 'root'
})
export class OrganizerPeopleService {
	private apiUrl = environment.apiURL + '/api/organizer-people';


	constructor(private http: HttpClient) {
	}

	getAll(): Observable<OrganizerPeople[]> {
		return this.http.get<OrganizerPeople[]>(this.apiUrl);
	}

	getById(id: number): Observable<OrganizerPeople> {
		return this.http.get<OrganizerPeople>(`${this.apiUrl}/${id}`);
	}

	create(organizerPeople: OrganizerPeople): Observable<OrganizerPeople> {
		return this.http.post<OrganizerPeople>(this.apiUrl, organizerPeople);
	}

	update(organizerPeople: OrganizerPeople): Observable<OrganizerPeople> {
		return this.http.put<OrganizerPeople>(`${this.apiUrl}/${organizerPeople.id}`, organizerPeople);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
