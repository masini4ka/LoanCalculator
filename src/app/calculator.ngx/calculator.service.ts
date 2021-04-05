import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoanData, LoanResult } from './calculator.model';

@Injectable({
    providedIn: 'root'
})
export class CalculatorHttpService {
    private ApiURL: string = 'http://localhost:4200/api';
    constructor(private httpclient: HttpClient) { }

    calculateLoan(payload: LoanData): Observable<LoanResult> {
        return this.httpclient.post<LoanResult>(this.ApiURL, JSON.stringify(payload), {
            headers: { 'X-API-KEY': environment.apikey }
        });
    }
}