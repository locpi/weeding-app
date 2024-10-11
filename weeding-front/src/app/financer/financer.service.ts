import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {FinanceItem} from "./financer-synthese/financer-synthese.component";

export enum FinancerType {
  FOOD = 'FOOD',
}

export interface Financer {
  id?: number;
  code: string;
  label: string;
  financerTypeList: FinancerType[];
  population:string[]
}

@Injectable({
  providedIn: 'root'
})
export class FinancerService {
  private apiUrl = environment.apiURL+'/api/financers';

  constructor(private http: HttpClient) {}

  getFinancers(): Observable<Financer[]> {
    return this.http.get<Financer[]>(this.apiUrl);
  }

  getFinancer(id: number): Observable<Financer> {
    return this.http.get<Financer>(`${this.apiUrl}/${id}`);
  }

  createFinancer(financer: Financer): Observable<Financer> {
    return this.http.post<Financer>(this.apiUrl, financer);
  }

  updateFinancer(financer: Financer): Observable<Financer> {
    return this.http.put<Financer>(`${this.apiUrl}/${financer.id}`, financer);
  }

  deleteFinancer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

	getSynthse():Observable<FinanceItem[]> {
      return this.http.get<FinanceItem[]>(this.apiUrl+'/price-stats');
    }
}
