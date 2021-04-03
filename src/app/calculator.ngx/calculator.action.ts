import { createAction, props } from '@ngrx/store';
import { LoanData, LoanResult } from './calculator.model';

export const GetLoanAction = createAction('[Loan Calculator] - Get Loan');

export const CalculateLoanAction = createAction(
    '[Loan] - Create Loan',
    props<{ payload: LoanData }>()
);

export const CalculateLoanActionSuccess = createAction(
    '[Loan] - Success Get Loan',
    props<{ payload: LoanResult }>()
);

export const CalculateLoanActionFail = createAction('[Loan Calculator] - Error', props<Error>());