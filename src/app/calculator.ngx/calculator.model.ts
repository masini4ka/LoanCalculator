export interface LoanResult {
    loanAmount: number,
    interestRate: number
};

export enum Children {
    None = 'NONE',
    Single = 'SINGLE',
    Multiple = 'MULTIPLE'
}

export enum Coaplicant {
    None = 'NONE',
    Single = 'SINGLE_BORROWER',
    Multiple = 'MULTIPLE_BORROWERS'
}

export interface LoanData {
    monthlyIncome: number;
    requestedAmount: number;
    loanTerm: number;
    children: Children;
    coapplicant: Coaplicant
}