import { LoanData, LoanResult } from "./calculator.model";


export default class LoanState {
    LoanData?: LoanData;
    LoanResult?: LoanResult;
    InputError?: any;
}

export const initializeState = (): LoanState => {
    return { LoanData: undefined, LoanResult: undefined, InputError: undefined };
};