import {environment} from "../../../environments/environment";
// organizer-people.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface GroupPeople {
	id: number;
	label: string;
	uuid: string;
}

@Injectable({
	providedIn: 'root'
})
export class GroupPeopleService {
	private apiUrl = environment.apiURL + '/api/group-people';


	constructor(private http: HttpClient) {
	}

	getAll(): Observable<GroupPeople[]> {
		return this.http.get<GroupPeople[]>(this.apiUrl);
	}

	getById(id: number): Observable<GroupPeople> {
		return this.http.get<GroupPeople>(`${this.apiUrl}/${id}`);
	}

	create(GroupPeople: GroupPeople): Observable<GroupPeople> {
		return this.http.post<GroupPeople>(this.apiUrl, GroupPeople);
	}

	update(GroupPeople: GroupPeople): Observable<GroupPeople> {
		return this.http.put<GroupPeople>(`${this.apiUrl}/${GroupPeople.id}`, GroupPeople);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
