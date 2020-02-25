import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Case} from '../model/case';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private http: HttpClient) {
  }

  getCases(): Observable<Case[]> {
    // https://smackcristian.pythonanywhere.com/cases/

    return this.http.get<Case[]>(`http://smackcristian.pythonanywhere.com/cases/`)
      .pipe(
        tap(response => {
          console.log('Ok');
        }));
  }
}
