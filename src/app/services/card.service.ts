import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, map, Observable } from 'rxjs';
import { CardModel } from '../models/card-mode';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  PATH_MAIN : String = 'http://localhost:9000/api/v1/card';

  constructor(private httpClient: HttpClient) { }

  getCards(): Observable<CardModel[]>{
    return this.httpClient.get<CardModel[]>(`${this.PATH_MAIN}/listar`).pipe(
      debounceTime(4000),
      map(res => res));
  }

  saveCard(request : any): Observable<any>{
    return this.httpClient.post<any>(`${this.PATH_MAIN}/save`, request).pipe(map(res => res));
  }

  updateCard(request : any): Observable<any>{
    return this.httpClient.post<any>(`${this.PATH_MAIN}/update`, request).pipe(map(res => res));
  }

  deleteCard(id: number): Observable<any>{
    return this.httpClient.get<any>(`${this.PATH_MAIN}/delete/${id}`).pipe(map(res => res));
  }
}
