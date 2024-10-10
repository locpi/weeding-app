import {CateringItem} from "./food.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CateringService {
  private apiUrl = environment.apiURL+'/api/catering';

  constructor(private http: HttpClient) { }

  getItems(): Observable<CateringItem[]> {
    return this.http.get<CateringItem[]>(this.apiUrl);
  }

  addItem(item: CateringItem): Observable<CateringItem> {
    return this.http.post<CateringItem>(this.apiUrl, item);
  }

  updateItem(item: CateringItem): Observable<CateringItem> {
    return this.http.put<CateringItem>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
