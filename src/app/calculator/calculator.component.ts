import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { CalculateLoanAction } from '../calculator.ngx/calculator.action';
import { LoanData, LoanResult } from '../calculator.ngx/calculator.model';
import LoanState from '../calculator.ngx/calculator.state';
import { Children, Coaplicant } from '../calculator.ngx/calculator.model';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { selectResult } from '../calculator.ngx/calculator.selector';
export interface Select {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

export class CalculatorComponent implements OnInit {

  private data: LoanData = {
    monthlyIncome: 500000,
    requestedAmount: 20000000,
    loanTerm: 360,
    children: Children.None,
    coapplicant: Coaplicant.Single
  };

  loanForm = this.fb.group({
    monthlyIncome: ['', Validators.required],
    requestedAmount: ['', Validators.required],
    loanTerm: ['', Validators.required],
    children: ['', Validators.required],
    coapplicant: ['', Validators.required],
  });


  childrenOptions: Select[] = [
    { value: Children.None, viewValue: '0 Children' },
    { value: Children.Single, viewValue: 'Single Child' },
    { value: Children.Multiple, viewValue: 'Multiple Children' }
  ];

  coaplicantOptions: Select[] = [
    { value: Coaplicant.None, viewValue: 'No Co-applicants' },
    { value: Coaplicant.Single, viewValue: 'Single Co-applicant' },
    { value: Coaplicant.Multiple, viewValue: 'Multiple Co-applicants' }
  ];

  // readonly loanInfo$ = this.store.pipe(
  //   select(selectResult),
  //   tap(result => console.error("RESULTTT", result))
  // );

  constructor(
    private store: Store<LoanState>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.error(this.data);
    // this.store.dispatch(CalculateLoanAction({ payload: this.data }));
    // const todo$ = this.store.pipe(select('LoanData'))
    //   .pipe(
    //     tap(wtf => console.error("???", wtf))
    //   )
    //   .subscribe();
  }

  onSubmit() {
    console.warn(this.loanForm.value);
    this.store.dispatch(CalculateLoanAction({ payload: this.loanForm.value }));

    this.store.pipe(
      select("LoanResult"),
      tap(result => console.error("RESULTTTWTFFFFFFFFFFFf", result))
    ).subscribe();
  }

}

//"params": "monthlyIncome",
//"message": "Monthly income is too low. Minimum income is 500 EUR"