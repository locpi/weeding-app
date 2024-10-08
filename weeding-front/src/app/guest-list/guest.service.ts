import {Guest} from "./guest.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = 'http://localhost:8080/api/guests';

  constructor(private http: HttpClient) { }

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.apiUrl);
  }

  addGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.apiUrl, guest);
  }

  updateGuest(guest: Guest): Observable<Guest> {
    return this.http.put<Guest>(`${this.apiUrl}/${guest.id}`, guest);
  }

  deleteGuest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
