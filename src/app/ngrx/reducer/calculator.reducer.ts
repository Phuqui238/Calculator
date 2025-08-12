import { createReducer, on } from '@ngrx/store';
import * as CalculatorActions from '../actions/calculator.actions';
import {initialState} from '../state/calculator.state';

export const calculatorReducer = createReducer(
  initialState,

  on(CalculatorActions.enterNumber, (state, { number }) => {
    const newCurrentNumber =
      state.currentNumber === '0' ? number.toString() : state.currentNumber + number.toString();

    return {
      ...state,
      currentNumber: newCurrentNumber,
      expression: newCurrentNumber,
    };
  }),

  on(CalculatorActions.enterOperator, (state, { operator }) => ({
    ...state,
    previousNumber: state.currentNumber,
    operator: operator,
    currentNumber: '0',
    expression: `${state.currentNumber} ${operator}`,
  })),


  on(CalculatorActions.calculateResult, (state) => {
    const prev = parseFloat(state.previousNumber);
    const current = parseFloat(state.currentNumber);
    let result = 0;

    switch (state.operator) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '/': result = current !== 0 ? prev / current : NaN; break;
      default: return state;
    }

    return {
      ...state,
      currentNumber: result.toString(),
      previousNumber: '0',
      operator: '',
      expression: '',
    };
  }),


  on(CalculatorActions.deleteNumber, (state) => {
    if (state.currentNumber.length <= 1) {
      return {
        ...state,
        currentNumber: '0',
        expression: '',
      };
    }

    const newCurrent = state.currentNumber.slice(0, -1);

    return {
      ...state,
      currentNumber: newCurrent,
      expression: newCurrent,
    };
  }),


  on(CalculatorActions.clear, () => initialState)
);
