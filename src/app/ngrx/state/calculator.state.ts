import {CalculatorState} from '../../models/number.model';

export const initialState: CalculatorState = {
  currentNumber: '0',
  previousNumber: '0',
  operator: '',
  result: '',
  expression: ''
};
