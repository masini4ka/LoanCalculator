import { LoanData, LoanResult } from "./calculator.model";


export default class LoanState {
    LoanData: LoanData | undefined;
    LoanResult: LoanResult | undefined;
    InputError: Error | undefined;
}

export const initializeState = (): LoanState => {
    return { LoanData: undefined, LoanResult: undefined, InputError: undefined };
};