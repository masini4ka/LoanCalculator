import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CalculatorHttpService } from './calculator.service';
import * as LoanActions from './calculator.action';
import { LoanResult } from './calculator.model';

@Injectable()
export class CalculatorEffects {
    constructor(
        private loanService: CalculatorHttpService,
        private actions$: Actions
    ) { }

    CalculateLoan$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(LoanActions.CalculateLoanAction),
            mergeMap(action =>
                this.loanService.calculateLoan(action.payload).pipe(
                    map((data: LoanResult) => LoanActions.CalculateLoanActionSuccess({ payload: data })),
                    catchError((error) => of(LoanActions.CalculateLoanActionFail(error)))
                )
            )
        )
    );
}
