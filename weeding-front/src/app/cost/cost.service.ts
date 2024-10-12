// cost-line.model.ts
import {environment} from "../../environments/environment";
// cost-line.service.ts
// time-line.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrganizerPeople} from "../people/organizer/organizer.service";
import {GroupPeople} from "../people/group/group-people.service";

export enum CostType {
	FIXE = 'FIXE',
	VARIABLE_PEOPLE = 'VARIABLE_PEOPLE'
}

export enum CostObject {
	FOOD = 'FOOD',
	PLACE = 'PLACE',
	OTHER = 'OTHER'
}

export enum CostPayment {
	CASH = 'CASH',
	TIMELINE = 'TIMELINE'
}

export interface CostLine {
	id: number;
	name: string;
	description: string;
	adultPrice: number;
	childPrice: number;
	adultQuantity: number;
	childQuantity: number;
	priceFixe: number;
	subName: string;
	type: CostType;
	object: CostObject;
	timeLineList: TimeLine[];
	paymentType: CostPayment;
	repartition?: Repartition[]
}

// time-line.model.ts
export interface TimeLine {
	id?: number;
	label?: string;
	uuid?: string;
	dueDate: Date;
	total: number;
	paid?: boolean;
	lastNotification?: string;
	cost?: CostLine;
}

export interface Repartition {
	id?: number,
	organizerPeople?: OrganizerPeople
	peopleGroups?: GroupPeople[]
}

@Injectable({
	providedIn: 'root'
})
export class CostLineService {
	private apiUrl = environment.apiURL + '/api/cost-lines';

	constructor(private http: HttpClient) {
	}

	getAll(): Observable<CostLine[]> {
		return this.http.get<CostLine[]>(this.apiUrl);
	}

	getById(id: number): Observable<CostLine> {
		return this.http.get<CostLine>(`${this.apiUrl}/${id}`);
	}

	create(costLine: CostLine): Observable<CostLine> {
		return this.http.post<CostLine>(this.apiUrl, costLine);
	}

	update(costLine: CostLine): Observable<CostLine> {
		return this.http.put<CostLine>(`${this.apiUrl}/${costLine.id}`, costLine);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}

@Injectable({
	providedIn: 'root'
})
export class TimeLineService {
	private apiUrl = environment.apiURL + '/api/time-lines';

	constructor(private http: HttpClient) {
	}

	getAll(): Observable<TimeLine[]> {
		return this.http.get<TimeLine[]>(this.apiUrl);
	}

	getById(id: number): Observable<TimeLine> {
		return this.http.get<TimeLine>(`${this.apiUrl}/${id}`);
	}

	create(timeLine: TimeLine): Observable<TimeLine> {
		return this.http.post<TimeLine>(this.apiUrl, timeLine);
	}

	update(timeLine: TimeLine): Observable<TimeLine> {
		return this.http.put<TimeLine>(`${this.apiUrl}/${timeLine.id}`, timeLine);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}

	getByUuid(uuid: string): Observable<TimeLine> {
		return this.http.get<TimeLine>(`${this.apiUrl}/uuid/${uuid}`);
	}
}