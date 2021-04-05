import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { CalculateLoanAction } from '../calculator.ngx/calculator.action';
import { LoanData } from '../calculator.ngx/calculator.model';
import LoanState from '../calculator.ngx/calculator.state';
import { Children, Coaplicant } from '../calculator.ngx/calculator.model';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoanInfoSelector } from '../calculator.ngx/calculator.selector';

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
    monthlyIncome: ['', [Validators.required, Validators.min(500000)]],
    requestedAmount: ['', [Validators.required, Validators.min(20000000)]],
    loanTerm: ['', [Validators.required, Validators.min(36), Validators.max(360)]],
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

  readonly loanResult$ = this.store.pipe(
    select(this.loanSelector.getLoanResult()),
    filter(x => !!x)
  );

  readonly errors$ = this.store.pipe(
    select(this.loanSelector.getErrors()),
    filter(x => !!x)
  );

  constructor(
    private store: Store<{ loanInfo: LoanState }>,
    private fb: FormBuilder,
    private loanSelector: LoanInfoSelector,
  ) {
  }

  ngOnInit(): void {
    console.error(this.data);
  }

  onSubmit() {
    console.warn(this.loanForm.value);
    this.store.dispatch(CalculateLoanAction({ payload: this.loanForm.value }));
  }

}