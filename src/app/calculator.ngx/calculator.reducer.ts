import { Action, createReducer, on } from '@ngrx/store';
import LoanState, { initializeState } from './calculator.state';
import * as LoanActions from './calculator.action';

export const intialState = initializeState();

const reducer = createReducer(
    intialState,
    on(LoanActions.CalculateLoanAction, (state: LoanState, { payload }) => {
        return { ...state, LoanData: payload };
    }),
    on(LoanActions.CalculateLoanActionSuccess, (state: LoanState, { payload }) => {
        return { ...state, LoanResult: payload, InputError: undefined };
    }),
    on(LoanActions.CalculateLoanActionFail, (state: LoanState, error: Error) => {
        console.log(error);
        return { ...state, InputError: error };
    })
);

export function LoanReducer(state: LoanState | undefined, action: Action) {
    return reducer(state, action);
}