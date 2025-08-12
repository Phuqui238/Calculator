import { createReducer, on } from '@ngrx/store';
import * as CalculatorActions from '../actions/calculator.actions';
import { CalculatorState, initialState } from '../state/calculator.state';

export const calculatorReducer = createReducer(
  initialState,

  on(CalculatorActions.enterNumber, (state, { number }) => {
    const isStartingNewNumber = state.operator && state.currentNumber === state.previousNumber;

    if (number === '.' && state.currentNumber.includes('.')) {
      return state;
    }

    const newCurrent = isStartingNewNumber
      ? number.toString()
      : (state.currentNumber === '0' ? number.toString() : state.currentNumber + number.toString());

    const newExpression = state.operator
      ? `${state.previousNumber} ${state.operator} ${newCurrent}`
      : newCurrent;

    return {
      ...state,
      currentNumber: newCurrent,
      expression: newExpression
    };
  }),

  on(CalculatorActions.enterOperator, (state, { operator }) => ({
    ...state,
    previousNumber: state.currentNumber,
    operator,
    expression: `${state.currentNumber} ${operator}`
  })),

  on(CalculatorActions.calculateResult, (state) => {
    const prev = parseFloat(state.previousNumber);
    const current = parseFloat(state.currentNumber);
    let res = 0;
    switch (state.operator) {
      case '+': res = prev + current; break;
      case '-': res = prev - current; break;
      case '*': res = prev * current; break;
      case '/': res = current !== 0 ? prev / current : NaN; break;
      default: return state;
    }
    return {
      ...state,
      result: res.toString(),
      currentNumber: res.toString(),
      previousNumber: '0',
      operator: '',
      expression: `${state.previousNumber} ${state.operator} ${state.currentNumber} = ${res}`
    };
  }),

  on(CalculatorActions.deleteNumber, (state) => {
    if (state.currentNumber.length <= 1) {
      return {
        ...state,
        currentNumber: '0',
        expression: ''
      };
    }
    const newCurrent = state.currentNumber.slice(0, -1);
    const newExpression = state.operator
      ? `${state.previousNumber} ${state.operator} ${newCurrent}`
      : newCurrent;
    return {
      ...state,
      currentNumber: newCurrent,
      expression: newExpression
    };
  }),

  on(CalculatorActions.clear, () => initialState)
);
