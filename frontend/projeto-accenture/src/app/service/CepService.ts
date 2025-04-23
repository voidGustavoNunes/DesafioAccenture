import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cep } from '../modules/Cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private apiUrl = '/api/cep';

  constructor(private http: HttpClient) { }

  validate(cep: string): Observable<Cep | null> {
    return this.http.get<Cep>(`${this.apiUrl}/${cep}`).pipe(
      catchError(() => of(null))
    );
  }
}
