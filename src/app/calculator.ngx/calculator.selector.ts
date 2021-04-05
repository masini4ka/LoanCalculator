import { Injectable } from "@angular/core";
import LoanState from "./calculator.state";

@Injectable({
    providedIn: "root"
})
export class LoanInfoSelector {
    getErrors() {
        return (state: { loanInfo: LoanState }): any => state.loanInfo?.InputError;
    }

    getLoanResult() {
        return (state: { loanInfo: LoanState }): any => state.loanInfo?.LoanResult;
    }

    getInterestRate() {
        return (state: { loanInfo: LoanState }): number | undefined => state.loanInfo?.LoanResult?.interestRate;
    }

    getLoanAmount() {
        return (state: { loanInfo: LoanState }): number | undefined => state.loanInfo?.LoanResult?.loanAmount;
    }
}