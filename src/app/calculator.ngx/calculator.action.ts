import { createAction, props } from '@ngrx/store';
import { LoanData, LoanResult } from './calculator.model';

export const ACTION_PREFIX = '[Loan Calculator]';

export const CalculateLoanAction = createAction(
    `${ACTION_PREFIX} - Calculate Loan`,
    props<{ payload: LoanData }>()
);

export const CalculateLoanActionSuccess = createAction(
    `${ACTION_PREFIX} - Calculate Loan Success`,
    props<{ payload: LoanResult }>()
);

export const CalculateLoanActionFail = createAction(
    `${ACTION_PREFIX} - Calculate Loan Fail`,
    props<Error>());