export interface CalculatorState {
  currentNumber: string;
  previousNumber: string;
  operator: string;
  result: string;
  expression: string;
}

export const initialState: CalculatorState = {
  currentNumber: '0',
  previousNumber: '0',
  operator: '',
  result: '',
  expression: ''
};
