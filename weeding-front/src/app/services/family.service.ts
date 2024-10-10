import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
	CreateFamilyDto,
	CreateGuestDto,
	Family,
	Guest, GuestStatistics,
	Page,
	UpdateFamilyDto
} from "../guest/guest-list/guest.model";
import {environment} from "../../environments/environment";


@Injectable({
	providedIn: 'root'
})
export class FamilyService {
	private apiUrl = environment.apiURL+'/api';

	constructor(private http: HttpClient) {}

	getFamilies(page: number, size: number): Observable<Page<Family>> {
		const params = new HttpParams()
			.set('page', page.toString())
			.set('size', size.toString());
		return this.http.get<Page<Family>>(`${this.apiUrl}/families`, { params });
	}

	getFamilyById(id: number): Observable<Family> {
		return this.http.get<Family>(`${this.apiUrl}/families/${id}`);
	}

	createFamily(createFamilyDto: CreateFamilyDto): Observable<Family> {
		return this.http.post<Family>(`${this.apiUrl}/families`, createFamilyDto);
	}

	updateFamily(id: number, updateFamilyDto: UpdateFamilyDto): Observable<Family> {
		return this.http.patch<Family>(`${this.apiUrl}/families/${id}`, updateFamilyDto);
	}

	deleteFamily(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/families/${id}`);
	}

	addGuestToFamily(familyId: number, guestDto: CreateGuestDto): Observable<Guest> {
		return this.http.post<Guest>(`${this.apiUrl}/families/${familyId}/guests`, guestDto);
	}

	updateGuest(guest:Guest): Observable<Guest> {
		return this.http.patch<Guest>(`${this.apiUrl}/guests/${guest.id}`,guest);
	}

	getGuestStatistics(): Observable<GuestStatistics> {
		return this.http.get<GuestStatistics>(`${this.apiUrl}/statistics`);
	}

	searchFamilies(query: string): Observable<Family[]> {
		return this.http.get<Family[]>(`${this.apiUrl}/families/search`, {
			params: new HttpParams().set('q', query)
		});
	}

	uploadFile(file:any):Observable<Object>{
		const formData = new FormData();
		formData.append('file', file);
		return this.http.post(`${this.apiUrl}/upload`, formData);
	}

	getGuestWithoutPhone(): Observable<Guest[]>  {
		return this.http.get<Guest[]>(`${this.apiUrl}/guest/no-phone`);
	}
}