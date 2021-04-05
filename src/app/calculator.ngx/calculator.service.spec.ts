import { LoanResult } from "./calculator.model";
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { CalculatorEffects } from "./calculator.effect";
import { of, ReplaySubject, throwError } from "rxjs";
import { CalculatorHttpService } from "./calculator.service";
import { CalculateLoanAction, CalculateLoanActionFail, CalculateLoanActionSuccess } from "./calculator.action";

const LOAN_RESULT_DATA_MOCK: LoanResult = {
    loanAmount: 123000000,
    interestRate: 2500
};

describe('CalculatorHttpServiceSpec', () => {
    let calculatorEffect: CalculatorEffects;
    let calculatorService: CalculatorHttpService;
    let actions$: ReplaySubject<Action>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, StoreModule.forRoot({})],
            providers: [
                Actions,
                CalculatorEffects,
                {
                    provide: CalculatorHttpService,
                    useValue: {
                        calculateLoan: () => () => undefined
                    }
                },
                provideMockActions(() => actions$),
            ]
        });
        calculatorEffect = TestBed.inject(CalculatorEffects);
        calculatorService = TestBed.inject(CalculatorHttpService);
        actions$ = new ReplaySubject();
    }));

    describe("given CalculateLoanAction is dispatched", () => {
        beforeEach(() => {
            actions$.next(CalculateLoanAction);
        });
        describe("and loan result is returned", () => {
            beforeEach(() => {
                spyOn(calculatorService, "calculateLoan").and.returnValue(of(LOAN_RESULT_DATA_MOCK));
            });
            it("should dispatch CalculateLoan success", done => {
                calculatorEffect.CalculateLoan$.subscribe(result => {
                    expect(result).toEqual(CalculateLoanActionSuccess({ payload: LOAN_RESULT_DATA_MOCK }));
                    done();
                });
            });
        });

        describe("and error is thrown", () => {
            beforeEach(() => {
                spyOn(calculatorService, "calculateLoan").and.returnValue((throwError(new Error())));
            });
            it("should dispatch fCalculateLoan ail", done => {
                calculatorEffect.CalculateLoan$.subscribe(result => {
                    expect(result).toEqual(CalculateLoanActionFail(new Error()));
                    done();
                });
            });
        });
    });
});

